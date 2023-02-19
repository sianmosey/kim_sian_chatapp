export default {
    props: ['message'],

    template: `
    <article>
        <h4 class="sender">{{message.message.name}}</h4>
        <p class="messageSent">{{message.message.content}}</p>
    </article>
    `
}