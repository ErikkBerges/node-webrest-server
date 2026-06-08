import { envs } from "./config/envs.js";
import { Server } from "./presentatio/server.js";



(()=>{
    main();
})();

function main(){

   const server = new Server({
    port:envs.PORT,
    public_path:envs.PUBLIC_PATH
   });
   server.start();
}