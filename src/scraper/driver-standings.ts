import axios from "axios";
import cheerio from "cheerio";

import { dynamicLinks } from "../endpoints/endpoints";

import { driverStanding } from "../types/types";

export const getDriverStandings = (year: number = new Date().getFullYear()): Promise<driverStanding[]> => {
    try {
        let driverStandings: driverStanding[] = [];

        return new Promise(async (resolve, reject) => {
            const response = await axios(`${dynamicLinks.driverStandings_1}/${year}/${dynamicLinks.driverStandings_2}`);
            const $ = cheerio.load(response.data);

            $("tr").each(function () {
                const position: number = parseInt($(this).find(" td:nth-child(2) ").text());
                const firstName: string = $(this).find(" a.dark.bold.ArchiveLink > span:nth-child(1)").text();
                const lastName: string = $(this).find(" a.dark.bold.ArchiveLink > span:nth-child(2)").text();
                const driver = firstName.concat(" ", lastName);
                const nationality: string = $(this).find(" td.dark.semi-bold.uppercase").text();
                const team: string = $(this).find("td:nth-child(5) > a.grey.semi-bold.uppercase.ArchiveLink").text();
                const points: number = parseInt($(this).find(" td:nth-child(6) ").text());

                if (!Number.isNaN(position) && !Number.isNaN(points) && driver.length !== 0 && nationality.length !== 0 && team.length !== 0) {
                    const driverStanding: driverStanding = {
                        position,
                        driver,
                        nationality,
                        team,
                        points,
                    };
                    driverStandings.push(driverStanding);
                }
            });
            resolve(driverStandings);
        });
    } catch (error: any) {
        throw new Error(error);
    }
};
