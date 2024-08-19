import { REST, Routes } from 'discord.js';
import { clientId, guildId, token } from './discord-config'
import commands from './commands/commands'

const infos = []
for (const command of commands) {
	if ('data' in command && 'execute' in command) {
		infos.push(command.data.toJSON());
	} else {
		console.log(`[WARNING] The commandis missing a required "data" or "execute" property.`);
	}
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${infos.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data : any = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: infos },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
