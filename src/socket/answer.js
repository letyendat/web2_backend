import slideService from '../services/slide.service.js';
import messageService from '../services/message.service.js';


const defaultUser = {
  id: 'anon',
  name: 'Anonymous',
};

const messageExpirationTimeMS = 5*60 * 1000;

class Connection {
  constructor(io, socket) {
    this.socket = socket;
    this.io = io;

    socket.on('getMessages', (presentation_id) => this.getMessages(presentation_id))
    socket.on('message', (message) => this.handleMessage(message))
    socket.on('multiChoice', (multiChoice) => this.handleMultiChoice(multiChoice));
    socket.on('presentation', (presentation) => this.handlePresentation(presentation));
    // socket.on('disconnect', () => this.disconnect());
    socket.on('connect_error', (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  }
  
  // ======== MultipleChoice
  sendMultiChoice(multiChoice) {
    this.io.sockets.emit('multiChoice', multiChoice);
  }
  // getMultiChoices() {
  //   messages.forEach((muiltiChoide) => this.sendMultiChoice(muiltiChoide));
  // }
  async handleMultiChoice(multiChoice) {
    const resp = await slideService.updateOption(multiChoice.id, multiChoice.index);
    this.sendMultiChoice(resp);
  }

  // ======== Message
  async handleMessage(message) {
    const resp = await messageService.create({presentation_id: message.presentation_id, message: message.message, owner_id: message.owner_id});
    const resp_message = await messageService.getOne(resp.data._id);
    this.sendMessage(resp_message.data);
  }
  sendMessage(message) {
    this.io.sockets.emit('message', message);
  }
  async getMessages(presentation_id) {
    const messages = await messageService.getMessages(presentation_id);

    messages.data.forEach((message) => this.sendMessage(message));
  }

  // ======== Presentation
  sendPresentation(presentation) {
    this.io.sockets.emit('presentation', presentation);
  }
  async handlePresentation(presentation) {
    this.sendPresentation(presentation);
  }

  disconnect() {
    
  }
}

function answer(io) {
  io.on('connection', (socket) => {
    new Connection(io, socket);   
  });

};

export default answer;