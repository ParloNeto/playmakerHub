export enum TypeSeason {
  TEMPORADA_2015 = "temporada-15-16",
  TEMPORADA_2016 = "temporada-16-17",
  TEMPORADA_2017 = "temporada-17-18",
  TEMPORADA_2018 = "temporada-18-19",
  TEMPORADA_2019 = "temporada-19-20",
  TEMPORADA_2020 = "temporada-20-21",
  TEMPORADA_2021 = "temporada-21-22",
  TEMPORADA_2022 = "temporada-22-23",
  TEMPORADA_2023 = "temporada-23-24",
  TEMPORADA_2024 = "temporada-24-25"

}

export function isValidTypeSeasonKey(value: any): boolean {
  return Object.values(TypeSeason).includes(value);
}
