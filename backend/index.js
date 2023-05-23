import app from './server.js';
import dotenv from "dotenv";
import mongodb from "mongodb";
import MoviesDAO from "./dao/moviesDAO.js";
import ReviewsDAO from "./dao/reviewsDAO.js";

async function main(){
    dotenv.config();
    const client = new mongodb.MongoClient(
        process.env.connectionString
    )
    const port = process.env.port || 8000;

    try {
        await client.connect()
        await MoviesDAO.injectDB(client);
        await ReviewsDAO.injectDB(client);

        app.listen(port, () =>{
            console.log("Server is running on port: " + port);
        })
    }catch(error){
        console.log({error_on_Index: error});
        process.exit(1);
    }
}

main().catch(console.error);