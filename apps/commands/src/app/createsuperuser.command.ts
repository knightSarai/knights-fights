import { PrismaService } from '@knights-fights/prisma';
import { SuperuserService } from '@knights-fights/superuser';
import { Command, CommandRunner, Option } from 'nest-commander';

@Command({
  name: 'create-superuser',
  arguments: '<username> <email> <password>',
  options: { isDefault: true },
  description: 'Create a superuser',
})
export class CreateSuperuser extends CommandRunner {
  constructor(private prisma: PrismaService, private superuser: SuperuserService) {
    super();
  }

  async run(
    inputs: string[],
    options: Record<string, any>
  ): Promise<void> {
    const [username, email, password] = inputs;
    await this.superuser.create(username, password, email);
    console.log('Superuser created');
  }
}
