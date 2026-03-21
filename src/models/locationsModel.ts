import { db } from "../app/db.ts";

export interface City {
    city: string
}

export interface District {
    district: string
    city: string,
}

export enum LocationSortOptions {
    CITY_ASC = "cityAsc",
    CITY_DESC = "cityDesc"
}

export const createCityTable = () => {
    db.prepare(`
        CREATE TABLE city (
            city TEXT PRIMARY KEY
        );
    `).run();
}

export const createDistrictsTable = () => {
    db.prepare(`
        CREATE TABLE districts (
            district TEXT PRIMARY KEY,
            city TEXT NOT NULL,
            FOREIGN KEY (city) REFERENCES city(city)
        );
    `).run();
}

export const getCities = (): City[] => {
    return db.prepare("SELECT * FROM city ORDER BY city").all();
}

export const getDistricts = (sort?: LocationSortOptions): District[] => {
    if (sort) {
        if (sort == LocationSortOptions.CITY_ASC)
            return db.prepare("SELECT * FROM districts ORDER BY city ASC").all();
        else (sort == LocationSortOptions.CITY_DESC)
            return db.prepare("SELECT * FROM districts ORDER BY city DESC").all();
    }
    return db.prepare("SELECT * FROM districts ORDER BY district").all();
}

export const addCity = (city: string) => {
    db.prepare(`
        INSERT INTO city (city) VALUES (?)
    `).run(city);
}

export const addDistrict = (district: string, city: string) => {
    db.prepare(`
        INSERT INTO districts (district, city) VALUES (?, ?)
    `).run(district, city);
}

export const deleteCityTable = () => {
    db.prepare("DROP TABLE IF EXISTS city").run();
}

export const deleteDistrictsTable = () => {
    db.prepare("DROP TABLE IF EXISTS districts").run();
}