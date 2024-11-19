import { readCSVObjects, writeCSV } from "jsr:@vslinko/csv";

const rowsProvince = [["province", "name"]];
const groupProvince = (obj: any) => {
  if (obj.code.split(".").length == 1) {
    const s = obj.code.split(".");
    s.push(obj.name);
    rowsProvince.push(s);
  }
};

const rowsCity = [["city", "province", "name"]];
const groupCity = (obj: any) => {
  if (obj.code.split(".").length == 2) {
    const s = obj.code.split(".");
    // rowsCity.push([s[0] + "." + s[1], s[0]]);
    rowsCity.push([s[0] + "." + s[1], s[0], obj.name]);
  }
};

const rowsDistrict = [["district", "city", "name"]];
const groupDistrict = (obj: any) => {
  if (obj.code.split(".").length == 3) {
    const s = obj.code.split(".");
    // s.push(obj.name);
    rowsDistrict.push([s[0] + "." + s[1] + "." + s[2], s[0] + "." + s[1], obj.name]);
  }
};
const rowsVillage = [["village", "district", "name"]];
const groupVillage = (obj: any) => {
  if (obj.code.split(".").length == 4) {
    const s = obj.code.split(".");
    s.push(obj.name);
    rowsVillage.push([s[0] + "." + s[1] + "." + s[2] + "." + s[3], s[0] + "." + s[1] + "." + s[2], obj.name]);
    // rowsVillage.push(s);
  }
};

const read = async () => {
  const f = await Deno.open("./wilayah.csv");
  for await (const obj of readCSVObjects(f)) {
    // groupProvince(obj);
    // groupCity(obj);
    // groupDistrict(obj);
    groupVillage(obj);
  }
  // write("01.province", rowsProvince);
  // write("02.city", rowsCity);
  // write("03.district", rowsDistrict);
  write("04.village", rowsVillage);
  f.close();
};

const write = async (name: string, value: string[][]) => {
  const f = await Deno.open(`./${name}.csv`, {
    write: true,
    create: true,
    truncate: true,
  });

  await writeCSV(f, value);

  f.close();
};

read();
