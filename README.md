# Calendar App
## Technology Used

### [TailwindCSS](https://tailwindcss.com/)
Used to style -on a fast way- the components of the app.

### [NextJS](https://nextjs.org/)
Used to build the app with some pre-built features.

### [Vercel](https://vercel.com/home?utm_source=next-site&utm_medium=banner&utm_campaign=next-website)
Fast way to deploy the app, and see it in production after pushing new PR's. 

### [Jest](https://jestjs.io)
Used to test functionally the app.
#

## Before you start
Install your dependencies with the following command: 
```bash
$ yarn install
```
Then run on development mode with the command: 

```bash
$ yarn dev
```

__WARNING__ - If you pretend to integrate the weather API with you app you should provide OPEN WEATHER app id as the following:
```
NEXT_PUBLIC_API_KEY=<your_app_id>
```

## Functions

This calendar can be used with the folllowing features:
- **Add Reminder** - Add a reminder to a specific date. You should give the date, title, description(max: 30 characters) color, and the city.
- **Edit Reminder** - Edit a reminder. You can modify all of the fields.
- **Remove One Reminder** - Remove the wanted reminder.
- **Remove All Reminders** - Remove all Reminders that are set to the given date.
- **Get Forecast(up to 7-days with free app id)** - After you create an reminder, you can see it's forecast.
- **Expand the calendar to handle other months of the year** - You can select the month on the upper side of the calendar, and create reminders for the other months.
#
