import {AxiosError, AxiosPromise} from "axios";
import {httpRequestHandler} from "../utils/httpRequestHandler";


export const searchWikiArticles = (searchPhrase: string): AxiosPromise<any> => {
    return new Promise((resolve, reject) => {
        httpRequestHandler.get(`api.php?action=query&list=search&format=json&srsearch="${searchPhrase}"&srlimit=10&origin=*`)
            .then((response) => {
                response.data.token;
                resolve(response);
            }).catch((e: AxiosError<any>) => {
                reject(e.response);
            })
    });
};