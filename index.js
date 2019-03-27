function Contact(name, username, email, phone, address, website) {
  this.fullCard = false;
  this.id = app.contacts.length + 1;
  this.name = name;
  this.username = username;
  this.email = email;
  this.phone = phone;
  this.address = address;
  this.website = website;
}

function Address(street, suite, city, zipcode) {
  this.street = street;
  this.suite = suite;
  this.city = city;
  this.zipcode = zipcode;
}

function createContact() {
  let address = new Address(
    app.newContact.address.street,
    app.newContact.address.suite,
    app.newContact.address.city,
    app.newContact.address.zipcode
  );

  let contact = new Contact(
    app.newContact.name,
    app.newContact.username,
    app.newContact.email,
    app.newContact.phone,
    address,
    app.newContact.website
  );

  app.contacts.push(contact);
}

Vue.component("card", {
  props: ["contact", "avatar"],
  template: `
  <div class="contact-card" @click="openModal">
    <img class="avatar" :src='"https://robohash.org/" + contact.id + avatar' alt="Robot Friend">
    <p class="contact-name"><strong>{{contact.name}}</strong></p>
    <p class="contact-email"><strong>{{contact.email}}</strong></p>
  </div>
  `,
  methods: {
    openModal: function() {
      app.selectedID = this.contact.id;
      this.contact.fullCard = !this.contact.fullCard;
    }
  }
});

Vue.component("modal", {
  props: ["contact", "avatar"],
  data: function () {
    return {
      warn: false,
      edit: false,
      editted: {
        name: "",
        username: "",
        email: "",
        address: {
          street: "",
          suite: "",
          city: "",
          zipcode: ""  
        },
        phone: "",
        website: ""
      },
    }
  },
  template: `
  <div class="modal-container" v-if="this.contact.fullCard">
    <div class="full-card" v-if="!edit">
      <header>
        <span class="close" @click="closeModal" v-if="!edit">&times;</span>
        <img class="modal-avatar" :src='"https://robohash.org/" + contact.id + avatar' alt="Robot Friend">
      </header>
      <main>
        <section class="row">
          <div class="label">
            <p>Name: </p>
          </div>
          <div class="details">
            <p id="name">{{contact.name}}</p>
          </div>
        </section>
        <section class="row">
          <div class="label">
            <p>Username: </p>
          </div>
          <div class="details">
            <p>{{contact.username}}</p>
          </div>
        </section>
        <section class="row">
          <div class="label">
            <p>Email: </p>
          </div>
          <div class="details">
            <p>{{contact.email}}</p>
          </div>
        </section>
        <section class="row">
          <div class="label">
            <p>Phone: </p>
          </div>
          <div class="details">
            <p>{{contact.phone}}</p>
          </div>
        </section>
        <section class="row">
          <div class="label">
            <p>Address: </p>
          </div>
          <div class="details">
            <p>{{contact.address.street}}</p>
            <p>{{contact.address.suite}}</p>
            <p>{{contact.address.city}}</p>
            <p>{{contact.address.zipcode}}</p>
          </div>
        </section>
        <section class="row">
          <div class="label">
            <p>Website: </p>
          </div>
          <div class="details">
            <p>{{contact.website}}</p>
          </div>
        </section>
      </main>
      <footer>
        <button @click="toggleEdit">Edit</button>
        <button @click="toggleWarning">Delete</button>
      </footer>
    </div>

    <div class="edit-contact" v-if="edit">
      <header>
        <img :src='"https://robohash.org/" + contact.id + avatar' alt="Robot Friend">
      </header>
      <section class="row">
        <div class="label">
          <p>Name: </p>
        </div>
        <div class="details">
          <input
            id="name"
            type="text"
            :placeholder="this.contact.name"
            v-model="editted.name"
          />
        </div>
      </section>
      <section class="row">
        <div class="label">
          <p>Username: </p>
        </div>
        <div class="details">
          <input
            id="username"
            type="text"
            :placeholder="this.contact.username"
            v-model="editted.username"
          />
        </div>
      </section>
      <section class="row">
        <div class="label">
          <p>Email: </p>
        </div>
        <div class="details">
          <input
            id="email"
            type="email"
            :placeholder="this.contact.email"
            v-model="editted.email"
          />
        </div>
      </section>
      <section class="row">
        <div class="label">
          <p>Phone: </p>
        </div>
        <div class="details">
          <input
            id="phone"
            type="text"
            :placeholder="this.contact.phone"
            v-model="editted.phone"
          />
        </div>
      </section>
      <section class="row">
        <div class="label">
          <p>Address: </p>
        </div>
        <div class="details">
          <input
            id="street"
            type="text"
            :placeholder="this.contact.address.street"
            v-model="editted.address.street"
          /><br />
          <input
            class="address"
            id="suite"
            type="text"
            :placeholder="this.contact.address.suite"
            v-model="editted.address.suite"
          /><br />
          <input
            class="address"
            id="city"
            type="text"
            :placeholder="this.contact.address.city"
            v-model="editted.address.city"
          /><br />
          <input
            class="address"
            id="zipcode"
            type="text"
            :placeholder="this.contact.address.zipcode"
            v-model="editted.address.zipcode"
          />
        </div>
      </section>
      <section class="row">
        <div class="label">
          <p>Website: </p>
        </div>
        <div class="details">
          <input
            type="text"
            :placeholder="this.contact.website"
            v-model="editted.website"
          />
        </div>
      </section>
      <footer>
        <button @click="updateContact">Done</button>
      </footer>
    </div>
    
    <div class="modal-container alert" v-if="warn">
      <div class="warning">
        <header>
          <h2>WARNING!</h2>
        </header>
        <main>
          <p>Are you sure you want to delete this contact? This action cannot be undone.</p>
        </main>
        <footer>
          <button @click="deleteContact">Delete</button>
          <button @click="toggleWarning">Cancel</button>
        </footer>
      </div>
    </div>
  </div>
  `,
  methods: {    
    closeModal: function(){
      this.contact.fullCard = !this.contact.fullCard;
    },
    editContact: function(name, username, email, phone, address, website){
      // let index = app.contacts.indexOf(app.contacts.find(obj =>{return obj.id === app.selectedID}));

      this.fullCard = true;
      this.id = app.selectedID;
      this.name = name;
      this.username = username;
      this.email = email;
      this.phone = phone;
      this.address = address;
      this.website = website;
    },
    editAddress: function(street, suite, city, zipcode){
      this.street = street;
      this.suite = suite;
      this.city = city;
      this.zipcode = zipcode;
    },
    updateContact: function(){
      let updatedAddress = new this.editAddress(
        this.editted.street,
        this.editted.suite,
        this.editted.city,
        this.editted.zipcode
      );
      let updatedContact = new this.editContact(
        this.editted.name,
        this.editted.username,
        this.editted.email,
        this.editted.phone,
        updatedAddress,
        this.editted.website
      );

      app.contacts.splice(app.contacts.indexOf(app.contacts.find(obj =>{return obj.id === app.selectedID})),1, updatedContact);
      this.toggleEdit();
    },

    deleteContact: function(){
      this.toggleWarning();
      app.contacts.splice(app.contacts.indexOf(app.contacts.find(obj =>{return obj.id === app.selectedID})),1);
    },
    toggleWarning: function(){
      this.warn = !this.warn;
    },
    toggleEdit: function(){
      this.edit = !this.edit;
    }

  }
});


const app = new Vue({
  el: "#app",
  data: {
    avatarType: "",
    avatarOptions: [
      { text: "Robots", value: "" },
      { text: "Monsters", value: "?set=set2" },
      { text: "Robot Heads", value: "?set=set3" },
      { text: "Cats", value: "?set=set4" }
    ],
    searchText: "",
    newContact: {
      fullCard: false,
      id: null,
      name: "",
      username: "",
      email: "",
      address: {
        street: "",
        suite: "",
        city: "",
        zipcode: ""
      },
      phone: "",
      website: ""
    },
    // editted: {
    //   name: "",
    //   username: "",
    //   email: "",
    //   address: {
    //     street: "",
    //     suite: "",
    //     city: "",
    //     zipcode: ""  
    //   },
    //   phone: "",
    //   website: ""
    // },
    addForm: false,
    fieldRequired: false,
    selectedID: 0,
    contacts: [
      {
        fullCard: false,
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874"
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org"
      },
      {
        fullCard: false,
        id: 2,
        name: "Ervin Howell",
        username: "Antonette",
        email: "Shanna@melissa.tv",
        address: {
          street: "Victor Plains",
          suite: "Suite 879",
          city: "Wisokyburgh",
          zipcode: "90566-7771"
        },
        phone: "010-692-6593 x09125",
        website: "anastasia.net"
      },
      {
        fullCard: false,
        id: 3,
        name: "Clementine Bauch",
        username: "Nathan",
        email: "Nathan@yesenia.net",
        address: {
          street: "Douglas Extension",
          suite: "Suite 847",
          city: "McKenziehaven",
          zipcode: "59590-4157"
        },
        phone: "1-463-123-4447",
        website: "ramiro.info"
      },
      {
        fullCard: false,
        id: 4,
        name: "Patricia Lebsack",
        username: "Karianne",
        email: "Julianne.OConner@kory.org",
        address: {
          street: "Hoeger Mall",
          suite: "Apt. 692",
          city: "South Elvis",
          zipcode: "53919-4257"
        },
        phone: "493-170-9623 x156",
        website: "kale.biz"
      },
      {
        fullCard: false,
        id: 5,
        name: "Chelsey Dietrich",
        username: "Kamren",
        email: "Lucio_Hettinger@annie.ca",
        address: {
          street: "Skiles Walks",
          suite: "Suite 351",
          city: "Roscoeview",
          zipcode: "33263"
        },
        phone: "(254)954-1289",
        website: "demarco.info"
      },
      {
        fullCard: false,
        id: 6,
        name: "Mrs. Dennis Schulist",
        username: "Leopoldo_Corkery",
        email: "Karley_Dach@jasper.info",
        address: {
          street: "Norberto Crossing",
          suite: "Apt. 950",
          city: "South Christy",
          zipcode: "23505-1337"
        },
        phone: "1-477-935-8478 x6430",
        website: "ola.org"
      },
      {
        fullCard: false,
        id: 7,
        name: "Kurtis Weissnat",
        username: "Elwyn.Skiles",
        email: "Telly.Hoeger@billy.biz",
        address: {
          street: "Rex Trail",
          suite: "Suite 280",
          city: "Howemouth",
          zipcode: "58804-1099"
        },
        phone: "210.067.6132",
        website: "elvis.io"
      },
      {
        fullCard: false,
        id: 8,
        name: "Nicholas Runolfsdottir V",
        username: "Maxime_Nienow",
        email: "Sherwood@rosamond.me",
        address: {
          street: "Ellsworth Summit",
          suite: "Suite 729",
          city: "Aliyaview",
          zipcode: "45169"
        },
        phone: "586.493.6943 x140",
        website: "jacynthe.com"
      },
      {
        fullCard: false,
        id: 9,
        name: "Glenna Reichert",
        username: "Delphine",
        email: "Chaim_McDermott@dana.io",
        address: {
          street: "Dayna Park",
          suite: "Suite 449",
          city: "Bartholomebury",
          zipcode: "76495-3109"
        },
        phone: "(775)976-6794 x41206",
        website: "conrad.com"
      },
      {
        fullCard: false,
        id: 10,
        name: "Clementina DuBuque",
        username: "Moriah.Stanton",
        email: "Rey.Padberg@karina.biz",
        address: {
          street: "Kattie Turnpike",
          suite: "Suite 198",
          city: "Lebsackbury",
          zipcode: "31428-2261"
        },
        phone: "024-648-3804",
        website: "ambrose.net"
      }
    ]
  },
  computed: {
    filterContacts: function() {
      return this.contacts.filter(contact => {
        return contact.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase())
          ? contact
          : null;
      });
    },
  },
  methods: {
    toggleForm: function() {
      this.formReset();
      this.addForm = !this.addForm;
    },
    submitContact: function() {
      if (
        this.newContact.name === "" ||
        this.newContact.username === "" ||
        this.newContact.email === ""
      ) {
        this.fieldRequired = true;
        alert("Please fill out the required fields");
      } else {
        createContact();
        this.addForm = !this.addForm;
      }
    },
    formReset: function() {
      this.newContact.name = "";
      this.newContact.username = "";
      this.newContact.email = "";
      this.newContact.phone = "";
      this.newContact.address.street = "";
      this.newContact.address.suite = "";
      this.newContact.address.city = "";
      this.newContact.address.zipcode = "";
      this.newContact.website = "";
      this.formComplete = false;
      this.fieldRequired = false;
    },
  }
});
