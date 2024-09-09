import { readdirSync, existsSync } from 'fs';
import path from 'path';
import { argv } from 'process';

class Commander
{
    static BASE_URL = 'src/lib/commands';

    commands = [];

    constructor()
    {
        if(!existsSync(Commander.BASE_URL)) {
            console.error("\x1b[31mCommands folder not found\x1b[0m");
            process.exit(1);
        }

        this.commands = readdirSync(Commander.BASE_URL).map(cmd => Commander.normalize(cmd));
    }

    /**
     * @param {string} command
     */
    exists(command)
    {
        return this.commands.includes(command);
    }

    /**
     * @param {string} command
     */
    async call(command, param, flags)
    {
        command = this.resolveCommandName(command);

        const Command = await Commander.import(command);
        Command.run({ param, flags });
    }

    /**
     * @param {string} command
     * @param {string} action
     */
    async callWithAction(command, action, param, flags)
    {
        command = this.resolveCommandName(command);

        const Command = await Commander.import(command);
        Command.run({ action, param, flags });
    }

    /**
     * @param {string} command
     */
    static async import(command)
    {
        return  (await import('file:///'.concat( path.resolve(Commander.BASE_URL, command.concat('.js')) ))).default;
    }

    /**
     * @param {string} command
     */
    resolveCommandName(command)
    {
        if(!this.exists(command)) {
            console.error("\x1b[31mCommand not found\x1b[0m");
            process.exit(1);
        }

        const name = command.slice(1);

        return command.charAt(0).toUpperCase().concat(name);
    }

    /**
     * @param {string} command
     */
    static normalize(command)
    {
        const extensions = ['.js', '.ts'];

        for(let ext of extensions) {
            command = path.basename(command, ext);
        }

        return command.toLowerCase();
    }

    /**
     * @param {string[]} flags
     */
    static normalizeFlags(flags = [])
    {
        const normalized = {};

        flags.forEach(flag => {
            const [key, value] = flag.split('=');

            normalized[key.replace(/-/g, '')] = value || true;
        });

        return normalized;
    }
}

const [command, ...params] = argv.slice(2);

if(command === undefined) {
    console.error("\x1b[31mPlease provide a command\x1b[0m");
    process.exit(1);
}

const [cmd, action] = command.split(':');
const [param, ...flags] = params;

const commander = new Commander();

try {
    if(action === undefined) {
        await commander.call(cmd, param, Commander.normalizeFlags(flags));
    } else {
        await commander.callWithAction(cmd, action, param, Commander.normalizeFlags(flags));
    }
} catch(e) {
    console.error("\x1b[31mError executing command\x1b[0m");
    console.error(e);
    process.exit(1);
}
