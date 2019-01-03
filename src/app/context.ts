import { StitchClient } from '@makes-apps/lib';

const AppContext = (clientAppId: string) => new StitchClient(clientAppId);
interface AppContext extends ReturnType<typeof AppContext> {}

export default AppContext;
