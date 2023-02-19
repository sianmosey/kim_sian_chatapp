import ChatMessage from "./components/TheMessageComponent.js"

(() => {
    console.log('fired');

    //load the socket library and make a connection     
    const socket = io();

    //messenger service event handling -> incoming from the manager
    function setUserId({ socketID, message }) {
        //incoming connected event with data
        vm.socket_ID = socketID;
    }

    function appendMessage(message) {
        console.log(vm);
        vm.messages.push(message);
        //this is to improve the speed of scroll update
        setTimeout(() => vm.scrollToBottom(), 1);
        //play a sound when a message is sent
        vm.$refs.bloop.currentTime = 0;
        vm.$refs.bloop.play();

    }

    const vm = new Vue({
        data: {
            messages: [],
            nickname: "",
            socket_ID: "",
            message: "",
            joined: false
        },
        create: function() {
            console.log("its alive");
        },

        methods: {
            shouldScroll() {
                return this.$refs.messages.scrollTop + this.$refs.messages.clientHeight === this.$refs.messages.scrollHeight;
            },
            scrollToBottom() {
                console.dir(this.$refs.messages);
                this.$refs.messages.scrollTop = this.$refs.messages.scrollHeight;
            },

            joinChat() {

                this.joined = true;
            },

            dispatchMessage() {

                socket.emit('chatmessage', { content: this.message, name: this.nickname || "Anonymous" })
            }
        },
        components: {
            newmessage: ChatMessage
        }

    }).$mount("#app");

    socket.addEventListener("connected", setUserId);
    socket.addEventListener("message", appendMessage);

})();