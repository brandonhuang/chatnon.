EasySecurity.config({
  general: {type: 'throttle', ms: 500},
  methods: {
    messageInsert: {type: 'throttle', ms: 1000}
  },
  maxQueueLength: 3
});