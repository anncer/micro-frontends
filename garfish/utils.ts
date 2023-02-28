//@ts-ignore
import portMap2 from './config.json';

export const portMap = portMap2

export const getPublicPath = (appName:any) => {
  //@ts-ignore
  const port = portMap[appName].port;
  //@ts-ignore
  const publicPath = portMap[appName].publicPath;
  return `//localhost:${port}/`;
};
//@ts-ignore
export const getPort = (appName:any) => portMap[appName].port;
