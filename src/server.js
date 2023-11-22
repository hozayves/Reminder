import { Model, createServer, hasMany, belongsTo, RestSerializer, Factory, trait } from "miragejs";

createServer({
    serializers: {
        reminder: RestSerializer.extend({
            include: ["list"],
            embed: true
        })
    },
    models: {
        reminder: Model.extend({
            list:belongsTo()
        }),
        list: Model.extend({
            reminders:hasMany()
        })
    },
    factories: {
        reminder: Factory.extend({
            text(i){
                return `Reminder - ${i}`
            } 
        }),
        list: Factory.extend({
            name(i) {
                return `List ${i}`
            },
            withReminders: trait({
                afterCreate(list, server) {
                    server.createList("reminder", 2, {list})
                }
            })
        })
    },
    routes() {
        this.namespace = "api"
        this.get("/reminders", (schema, request) => {
            return schema.reminders.all()
        })
        this.post("/reminders", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            return schema.reminders.create(attrs)
        })
        this.delete("/reminders/:reminderId", (schema, request) => {
            const id = request.params.reminderId;
            return schema.reminders.find(id).destroy();
        })
        this.get("/lists", (schema, request) => {
            return schema.lists.all();
        })
        this.post("/lists", (schema, request) => {
            let attrs = JSON.parse(request.requestBody)
            return schema.lists.create(attrs)
        })
        this.get("/lists/:id/reminders", (schema, request) => {
            let listId = request.params.id
            let list = schema.lists.find(listId)
            return list.reminders
        })
        this.delete("/lists/:id", (schema, request) => {
            const id = request.params.id;
            return schema.lists.find(id).destroy()
        })
    },
    seeds(server) {
        const homeList = server.create("list", {
            name: "Home",
            reminders: [server.create("reminder", {text: "Cleaning a dish"})]
        });

        server.create("reminder", {list: homeList, text: "Do taxes"})

        const workList = server.create("list", {name: "Work"}, "withReminders")
        server.create("list", { name: "Holiday Party"})
        server.create("reminder", {list: workList, text: "Visit bank"})
    }
})