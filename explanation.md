modules/
   schema.ts = Define the data shape and describe what fields has and include the any validation rules or database constraints on those fields.

   repository.ts = Handles all the direct databse operations.like methods findById(),findByEmail(),create() like that.

   service.ts = Contains the business logic.This call the repository to get data,then applies rules on top

   controller.ts = Handles HTTP requests and responses.This reads incoming request data(body,params,query),calls the appropriate service method,and sends back the HTTP response.

   route.ts = Wires URL paths to controller methods.like GET/users/:id maps to controller.getUser(),or POST/usersmaps to controller.createUser().