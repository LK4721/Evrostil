const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const root = path.resolve(__dirname, "..", "public", "Materijali");
const u03 = (file) => `http://www.evrostil-m.mk/wp-content/uploads/2016/03/${encodeURI(file)}.jpg`;

const groups = {
    "iverka-kronospan": [
        "R5137",
        "R-5816",
        "K022",
        "K021",
        "K020",
        "K019",
        "K018",
        "K017",
        "K016",
        "K015",
        "K014",
        "K013",
        "K012",
        "K011",
        "K010",
        "K009",
        "K008",
        "K007",
        "K006",
        "K005",
        "K004",
        "K003",
        "K002",
        "K001",
        "F7222",
        "F22-014",
        "F22-013",
        "F22-012",
        "F22-006",
        "F22-005",
        "F-06-180",
        "f-8816",
        "f-8812",
        "F-8582",
        "F-8567",
        "9944",
        "9775",
        "9763",
        "9755",
        "9462",
        "9461",
        "9345",
        "8996",
        "8995",
        "8984",
        "8953",
        "8921",
        "8686",
        "8657",
        "8656",
        "8601",
        "8547",
        "8545",
        "8509",
        "8508",
        "8436",
        "8435",
        "8417",
        "8414",
        "8413",
        "8410",
        "8409",
        "8362",
        "8361",
        "8349",
        "8348",
        "8313",
        "8312",
        "8203",
        "6597",
        "4299",
        "4298",
        "2216",
        "1792",
        "0854",
        "0776",
        "0775",
        "0740",
        "0729",
        "0514",
        "0381",
        "0375",
        "0344",
        "0190",
        "0164",
        "0110",
    ],
    "iverka-kastamonu": [
        "A835",
        "A830",
        "A829",
        "A822",
        "A820",
        "A819",
        "A818",
        "A810",
        "A809",
        "A808",
        "A807",
        "A806",
        "A804",
        "A415",
        "A400",
        "A396",
        "A395",
        "A392",
        "A380",
        "A379",
        "A359",
        "A357",
        "A356",
        "A354-BOSFOR_01",
        "A353",
        "A319",
        "A316",
        "F-241",
        "F-240",
        "A-406",
        "A-394",
        "A-385",
        "A-318",
        "A-303",
        "d412",
        "d164",
        "d153",
        "d146",
        "d144",
        "d138",
        "d137",
        "d128",
        "d118",
        "d_149",
        "d_145",
        "d_143",
        "d_134",
        "d_133",
        "d_129",
        "d_126",
        "d_125",
        "d_123",
        "d_120",
        "d_117",
        "d_116",
        "d_114",
        "d_108",
        "d_107",
        "d_104",
        "d_102",
    ],
    "mijalnici-granit": [
        "granit-14",
        "granit-13",
        "granit-12",
        "granit-11",
        "granit-10",
        "granit-09",
        "granit-08",
        "granit-07",
        "granit-06",
        "granit-05",
        "granit-04",
        "granit-03",
        "granit-02",
        "granit-01",
        "JUNIOR-KATALOG-2015-page-005-2",
        "JUNIOR-KATALOG-2015-page-004",
        "JUNIOR-KATALOG-2015-page-004-2",
    ],
    "mijalnici-inox": [
        "Inox-32",
        "Inox-31",
        "Inox-30",
        "Inox-29",
        "Inox-28",
        "Inox-27",
        "Inox-26",
        "Inox-24",
        "Inox-23",
        "Inox-22",
        "Inox-21",
        "Inox-19",
        "Inox-18",
        "Inox-17",
        "Inox-16",
        "Inox-15",
        "Inox-14",
        "Inox-12",
        "Inox-11",
        "Inox-10",
        "Inox-09",
        "Inox-08",
        "Inox-05",
        "Inox-04",
        "Inox-03",
        "Inox-02",
        "Inox-01",
        "JUNIOR-KATALOG-2015-page-003",
        "JUNIOR-KATALOG-2015-page-003-2",
        "JUNIOR-KATALOG-2015-page-002",
    ],
};

async function download(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
    return Buffer.from(await response.arrayBuffer());
}

async function ensureWebp(folder, file) {
    const outputFolder = path.join(root, folder);
    const outputPath = path.join(outputFolder, `${file}.webp`);
    fs.mkdirSync(outputFolder, { recursive: true });

    if (fs.existsSync(outputPath)) return;

    const sourceCopies = [
        path.join(root, "2016-03", `${file}.webp`),
        path.join(root, "iverka", `${file}.webp`),
        path.join(root, "mijalnici", `${file}.webp`),
    ];
    const copySource = sourceCopies.find((candidate) => fs.existsSync(candidate));

    if (copySource) {
        fs.copyFileSync(copySource, outputPath);
        return;
    }

    const input = await download(u03(file));
    await sharp(input).webp({ quality: 82 }).toFile(outputPath);
}

async function main() {
    let count = 0;

    for (const [folder, files] of Object.entries(groups)) {
        for (const file of files) {
            await ensureWebp(folder, file);
            count += 1;
        }
        console.log(`${folder}: ${files.length}`);
    }

    console.log(`Done: ${count}`);
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
