# WheresMyMoney
A tool for figuring out where my money went

# Usage
  - Clone Repo
  - Update `config.json` with the Groups, SubGroups, and hooks your data will rely on
  - Update the CSVFields in `config.json` with fields valid for your data
  - Paste your data in `fileToParse.csv`
  - Update `/src/CSVEntryLib` methods with the locations of:
    - Date
    - Price
    - Description
  - run `npm run start`
