# VueFriends

The VueFriends contact card web app is based on a tutorial project called _Robofriends_ from Andrei Neagoie's Udemy course, _[The Complete Web Developer in 2019: Zero to Mastery](https://www.udemy.com/the-complete-web-developer-zero-to-mastery/)_. It's a wonderful course and I highly recommend it!

The original project was created using React, and utlizes the [Robohash](https://robohash.org/) and [JSONPlaceholder](https://jsonplaceholder.typicode.com/) APIs to create a series of contact cards with unique robot avatars for a sample list of contacts/friends. Additionally, the [Tachyons](https://tachyons.io/) CSS toolkit is used for quick styling. The finished tutorial project culminated in an application that featured contact cards that displayed the contact's name and email, as well as an avatar. The project included a search field that would filter the contacts displayed based on whether the name of a given contact contained whatever was entered into the search field. The purpose of the tutorial project was to introduce students to reactive, component-based web development using the React framework.

In an effort to learn something new, I decided to recreate this project using Vue instead of React. I was curious how the two would compare both from a learning standpoint as well as use standpoint. Unlike the tutorial project, I do not utilize the Tachyons CSS toolkit in VueFriends. Instead all styling, with the exception of the media queries template, which was taken from W3Schools, was coded from scratch. Additionally, I wanted to add features that were not part of the original project and that would provide further challenges and learning opportunities. In addition to building an app that displayed component-based, filterable contact cards, VueFriends also includes the following:

_**Full Robohash Use**_

While the tutorial project only utilized robot avatars from the Robohash API, I decided to make use of the variety of avatar types the API provides:

- Robots
- Monsters
- Robot Heads
- Cats

The VueFriends application includes an option for the user to select which type of avatar they would like use for the contact cards, adding a little bit of personaliztion to the application.

_**Full Contact Card**_

The main view of the application displays contact cards for all contacts in the contact list. Like the tutorial project, these contact cards feature an avatar for the contact, the contact's name, and the contact's email address. The object structure for the contact list allows for a lot more information such as:

- Username
- Phone Number
- Address
- Website

In order to display the entirety of the contact's information, the VueFriends application allows the user to click on a contact card to dispaly an expanded, or full, contact card containing all of the contact's information. The expanded contact card also provides the user the option to edit the contact information or delete the contact altogether.

_**Edit Contact**_

Clicking on the **Edit** button on the expanded contact card will change the contact details from text to input fields, whereby the user can modify or add additional contact information. When the user is done, the contact's information will be updated with any of information input by the user. If a field is left blank by the user, then the corresponding contact information for the that field will be left unchanged.

_**Delete Contact**_

Clicking on the **Delete** button on the expanded contact card will display a warning asking the user if they wish to delete the selected contact, while informing them that the action cannot be undone. The user can choose to continue and delete the contact from the list, thereby removing the contact card and data, or they cancel the action.

_**Add New Contact**_

VueFriends provides the user a way to add contacts to the contact list. Clicking the **Add Friend** button will launch a form where the user will be able to enter the contact's details. The form features an alert that will prevent the user from submitting the form and creating the new contact if the minimum information is not entered (name, username, and email).

Once the form is submitted a new contact card is generated with a unique avatar. The new contact card can be filtered with the search function, or editted and deleted just like the rest of the contact cards.

## Enjoy!
