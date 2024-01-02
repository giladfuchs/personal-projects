from datetime import datetime
import discord
from discord.ext import commands

intents = discord.Intents.default()  # Create a default intents object
intents.messages = True
intents.presences = False  # Disable presence event

# Initialize a bot instance
bot = commands.Bot(command_prefix='!', intents=intents)

now = datetime.now()

TOKEN = ''
DAYS_BACK = 15
MESSAGE = 'הפרוייקט עדיין פעיל?'

SEND_MESSAGE = False
EXCLUDE_CHANNELS = ['rust-book-hebrew']


@bot.event
async def on_ready():
    print(f'Logged in as {bot.user.name}, go to send message {SEND_MESSAGE}')
    server = bot.guilds[0]
    channels = [channel for channel in server.text_channels if
                'rojects' in channel.category.name and 'projects-archive' != channel.category.name and channel.name not in EXCLUDE_CHANNELS]
    print(f'channels we going to test\n {[channel.name for channel in channels]}\n\n')
    for channel in channels:
        try:

            last_message = await channel.fetch_message(channel.last_message_id)
            last_time_message = (now - last_message.created_at.replace(tzinfo=None)).days
            if last_time_message > DAYS_BACK:
                if SEND_MESSAGE:
                    await channel.send(MESSAGE)
                print(last_message.channel, (now - last_message.created_at.replace(tzinfo=None)).days,
                      last_message.created_at.strftime("%d/%m "))
        except Exception as ex:
            print(f'problem with {channel.name}, ex: {ex}')
    exit(0)


if __name__ == '__main__':
    bot.run(TOKEN)
#
