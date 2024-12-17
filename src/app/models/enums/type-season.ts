export enum TypeSeason {
  TEMPORADA_2014 = "temporada-14-15",
  TEMPORADA_2015 = "temporada-15-16",
  TEMPORADA_2016 = "temporada-16-17",
  TEMPORADA_2017 = "temporada-17-18",
  TEMPORADA_2018 = "temporada-18-19",
  TEMPORADA_2019 = "temporada-19-20",
  TEMPORADA_2020 = "temporada-20-21",
  TEMPORADA_2021 = "temporada-21-22",
  TEMPORADA_2022 = "temporada-22-23",
  TEMPORADA_2023 = "temporada-23-24",
  TEMPORADA_2024 = "temporada-24-25",
  TEMPORADA_2025 = "temporada-25-26",
  TEMPORADA_2026 = "temporada-26-27",
  TEMPORADA_2027 = "temporada-27-28",
  TEMPORADA_2028 = "temporada-28-29",
  TEMPORADA_2029 = "temporada-29-30",
  TEMPORADA_2030 = "temporada-30-31"
}

export function isValidTypeSeasonKey(value: any): boolean {
  return Object.values(TypeSeason).includes(value);
}
