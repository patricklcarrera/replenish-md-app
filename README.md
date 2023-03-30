# REPLENISH MD APP

An employee portal to submit invoices and view,edit, and delete products


## Get Started running the app

To use our app, first go into the frontend client.  Then, run ```npm install && npm start```.

```
npm install
npm start
```

To set up the backend, run the following commands on another terminal
```
bundle install
```

```
rails server
```

## User stories

User would be able to add an invoice and be sent to the invoice page.

View, add, delete, or update products in the product list

Users will be able to see their past invoices that is stored in the database


## Wireframe

![Wireframe](client/public/replenishwireframe.PNG)


### Backend

The backend was created with Rails.   

Associations Diagram:

![Association](client/public/ERDDIAGRAM.PNG)



### Technologies

- React
- Rails 
- PostgreSQL
- Tailwind CSS


### Stretch Goals 


- Be able to send text messages to if there’s a new invoice
Forgot password feature

- Add a row in Employee for percentage (different employees get different rates)
