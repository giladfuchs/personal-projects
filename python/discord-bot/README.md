
  
# Discord Channel Monitoring Bot

## Overview
This Discord bot is designed to identify and notify inactive Discord channels by sending them messages to check if they are still in use. It was initially created to support the [Maakaf Project](https://maakaf-landing-page.netlify.app/).

## Installation and Usage

To install and run the bot, follow these steps:

1. **Prerequisites**
   - You will need a Discord account.
   - Python must be installed on your computer.

2. **Create a Discord Bot and Get Token**

   - Go to the [Discord Developer Portal](https://discord.com/developers/applications).
   - Click "New Application" and give your bot a name.
   - In the left sidebar, click "Bot" and then "Add Bot." This will create your bot user.
   - Under the bot's username, click "Copy" to copy the bot's token. You'll need to paste this token in your bot's configuration.
   - Ask the server admin to add your bot by sending them this link:
   
     ```
     https://discord.com/oauth2/authorize?client_id={{ClientId}}&permissions=8&scope=bot%20applications.commands
     ```
   
     Replace `{{ClientId}}` with your bot's Client ID.
     - Permissions '8' corresponds to admin privileges. You can adjust the permissions based on your needs using the Discord GUI.

3. **Install Dependencies**
   
   Run the following command to install the required Python libraries:
   
   ```bash
   python3 -m pip install -r requirements.txt
   ```

4. **Run the Bot**

   Start the bot by running:
   
   ```bash
   python3 main.py
   ```

## Contributing

Contributions and feature requests are welcome. Please feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

```
 
