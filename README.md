This is frontend part of contact-list. It uses Auth0 for authentication and once you sign in
You can add new contact
You can edit a contact
You can delete a contact

Backend is deployed on cyclic.sh. After deployment on cyclic.sh we get a endpoint. I have mapped that endpoint in frontend to access backend. MongoDB is used as a database in this app.

For designing UI a little bit I have used tailwind-css. This styling framework is focused in mobile-design-first approach.

On the main page you can click on Avtar or Name to view full details. Have not added adding image option in contact form. I has four attribute
{Name, Phone, Email, Address}. So by default a static image is rendered for all user. But once we update our backend and frontend with uploading image functionality we can definetely add image.

For handeling this image work have been already done. If we get user image from our API endpoint it will automatically be updated in UI if not static image will be rendered.
