# React-country-state-city

A lightweight and easy-to-use React library that provides a comprehensive list of regions or continents, countries, states, cities, languages, and country phone codes for creating dynamic and searchable dropdowns. Ideal for building forms and input fields that require accurate and up-to-date geographical selections, with seamless integration for improved user experience.

## Installation

```
$ npm install --save react-country-state-city
$ yarn add react-country-state-city

$ import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
  RegionSelect,
  PhonecodeSelect
} from "react-country-state-city";

$ import "react-country-state-city/dist/react-country-state-city.css";
```

## Features

- Easy to set up for real, you can make it work in less than 1minute!
- Super easy to customize
- Can also use it in your own custom UI.
- Autosuggest: a list of matching countries is displayed when the input text changes.
- Country data is provided, State data is provided based on given country id, City data is provided based on given country id and state id.
- Country flag icons.
- onChange and onTextChange callbacks.
- And much more !
- Language dropdown to list and search all languages in English and native too.
- Regions or Continents dropdown to list and search all the regions from the world.
- Phonecode dropdown to list and search all the codes based on country name or phone codes.

## Data

By default, the control will load the github hosted data files. Alternatively, you can [download the data](https://github.com/venkatmcajj/react-country-state-city/tree/master/data) json file and host it yourself. Simply download the JSON files, and supply the src property to each control to tell it where to download from.


## The gist

### Default

```jsx
import {
  CitySelect,
  CountrySelect,
  StateSelect,
  LanguageSelect,
  RegionSelect,
  PhonecodeSelect
} from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

function App() {
  const [region, setRegion] = useState("");
  const [phonecode, setPhoneCode] = useState("");
  const [countryid, setCountryid] = useState(0);
  const [stateid, setstateid] = useState(0);
  return (
    <div>
      <h6>Region / Continent</h6>
      <RegionSelect
        onChange={(e) => {
          setRegion(e.name);
        }}
        placeHolder="Select Region"
      />
      
      <h6>Country</h6>
      <CountrySelect
        onChange={(e) => {
          setCountryid(e.id);
        }}
        placeHolder="Select Country"
        region={region}
      />
      <h6>All Country</h6>
      <CountrySelect
        onChange={(e) => {
          setCountryid(e.id);
        }}
        placeHolder="Select Country"
      />
      <h6>Phone Code</h6>
      <RegionSelect
        onChange={(e) => {
          setPhoneCode(e.phone_code);
        }}
        placeHolder="Select Phone Code"
      />
      <h6>State</h6>
      <StateSelect
        countryid={countryid}
        onChange={(e) => {
          setstateid(e.id);
        }}
        placeHolder="Select State"
      />
      <h6>City</h6>
      <CitySelect
        countryid={countryid}
        stateid={stateid}
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select City"
      />
      <h6>Language</h6>
      <LanguageSelect
        onChange={(e) => {
          console.log(e);
        }}
        placeHolder="Select Language"
      />
    </div>
  );
}
```

### Custom

```jsx
import {
  GetCountries,
  GetState,
  GetCity,
  GetLanguages,
  GetRegions,
  GetPhonecodes //async functions
} from "react-country-state-city";

function App() {
  const [region, setRegion] = useState("");
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);
  const [language, setLanguage] = useState(0);
  const [phoneCode, setPhoneCode] = useState("");

  const [phonecodeList, setPhonecodeList] = useState([]);
  const [regionsList, setRegionsList] = useState([]);
  const [countriesList, setCountriesList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [languageList, setLanguageList] = useState([]);

  useEffect(() => {
    GetPhonecodes().then((result) => {
      setPhonecodeList(result);
    });
    GetRegions().then((result) => {
      setRegionsList(result);
    });
    GetCountries().then((result) => {
      setCountriesList(result);
    });

    GetLanguages().then((result) => {
      setLanguageList(result);
    });
  }, []);
  return (
    <div>
      <h6>Region</h6>
      <select
        onChange={(e) => {
          const _region = regionsList[e.target.value];
          setRegion(_region.name);
        }}
        value={region}
      >
        {regionsList.map((item, index) => (
          <option key={index} value={index}>
            {item.name}
          </option>
        ))}
      </select>
      <h6>Country</h6>
      <select
        onChange={(e) => {
          const country = countriesList[e.target.value]; //here you will get full country object.
          setCountryid(country.id);
          GetState(country.id).then((result) => {
            setStateList(result);
          });
        }}
        value={countryid}
      >
        {countriesList.map((item, index) => (
          <option key={index} value={index}>
            {item.name}
          </option>
        ))}
      </select>
      <h6>Phone Code</h6>
      <select
        onChange={(e) => {
          setPhoneCode(e.target.value);
        }}
        value={phoneCode}
      >
        {phonecodeList.map((item, index) => (
          <option key={index} value={item.phone_code}>
            +{item.phone_code} - {item.name}
          </option>
        ))}
      </select>
      <h6>State</h6>
      <select
        onChange={(e) => {
          const state = stateList[e.target.value]; //here you will get full state object.
          setStateid(state.id);
          GetCity(countryid, state.id).then((result) => {
            setCityList(result);
          });
        }}
        value={stateid}
      >
        {stateList.map((item, index) => (
          <option key={index} value={index}>
            {item.name}
          </option>
        ))}
      </select>
      <h6>City</h6>
      <select
        onChange={(e) => {
          const city = cityList[e.target.value]; //here you will get full city object.
          setCityid(city.id);
        }}
        value={cityid}
      >
        {cityList.map((item, index) => (
          <option key={index} value={index}>
            {item.name}
          </option>
        ))}
      </select>
      <h6>Language</h6>
      <select
        onChange={(e) => {
          setLanguage(e);
        }}
        value={language}
      >
        {languageList.map((item, index) => (
          <option key={index} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
```

### City Example

<img src="https://raw.githubusercontent.com/venkatmcajj/react-country-state-city/master/example/src/example1.png" alt="React country state city example screenshot"/>

### GetCity - Result

[
{
id: number;
name: string;
latitude: string;
longitude: string;
},
...
]


### State Example

<img src="https://raw.githubusercontent.com/venkatmcajj/react-country-state-city/master/example/src/example2.png" alt="React country state city example screenshot"/>

### GetState - Result

[
{
id: number;
name: string;
state_code: string;
latitude: string;
longitude: string;
},
...
]


### Country Example

<img src="https://raw.githubusercontent.com/venkatmcajj/react-country-state-city/master/example/src/example3.png" alt="React country state city example screenshot"/>

### GetCountries - Result

[
{
id: number;
name: string;
iso3: string;
iso2: string;
numeric_code: string;
phone_code: number;
capital: string;
currency: string;
currency_name: string;
currency_symbol: string;
native: string;
region: string;
subregion: string;
emoji: string;
emojiU: string;
tld: string;
latitude: string;
longitude: string;
},
...
]


### Languages Example

<img src="https://raw.githubusercontent.com/venkatmcajj/react-country-state-city/master/example/src/example4.png" alt="React country state city example screenshot"/>

<img src="https://raw.githubusercontent.com/venkatmcajj/react-country-state-city/master/example/src/example5.png" alt="React country state city example screenshot"/>

### GetLanguages - Result

[
{
code: string;
name: string;
native: string;
},
...
]


### Regions Example

<img src="https://raw.githubusercontent.com/venkatmcajj/react-country-state-city/master/example/src/example6.png" alt="React country state city example screenshot"/>

### GetRegions - Result

[
{
id: string;
name: string;
},
...
]

### Phonecode Example

<img src="https://raw.githubusercontent.com/venkatmcajj/react-country-state-city/master/example/src/example7.png" alt="React country state city example screenshot"/>

### GetPhonecodes - Result

[
{
id: string;
name: string;
region:string;
phone_code:string;
},
...
]


## The Country Select Properties

Properties used to customise the rendering:

| Name               | Type     | Description                                                                             |
| ------------------ | -------- | --------------------------------------------------------------------------------------- |
| src       | string  | `optional` The relative or absolute URL where the data files are hosted. Default is to serve from hosted CDN. e.g., https://venkatmcajj.github.io/react-country-state-city/data                                          |
| defaultValue       | Country  | `optional` The current value: a country object                                          |
| containerClassName | string   | `optional` styles for a container                                                       |
| inputClassName     | string   | `optional` styles for input box                                                         |
| onChange           | function | `optional` The current value: a country object.The argument is the country object       |
| onTextChange       | function | `optional` A callback fired when the input text changes.                                |
| placeHolder        | string   | `optional` Placeholder text displayed in empty input                                    |
| showFlag           | boolean  | `optional` Flags are displayed when true and not displayed when false. default is true. |

## State Select Properties

The same country select properties and additionally

| Name      | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| src       | string  | `optional` The relative or absolute URL where the data files are hosted. Default is to serve from hosted CDN. e.g., https://venkatmcajj.github.io/react-country-state-city/data                                          |
| countryid | number | `required` The id of the selected country object |

## City Select Properties

The same country select properties and additionally

| Name      | Type   | Description                                      |
| --------- | ------ | ------------------------------------------------ |
| src       | string  | `optional` The relative or absolute URL where the data files are hosted. Default is to serve from hosted CDN. e.g., https://venkatmcajj.github.io/react-country-state-city/data                                          |
| countryid | number | `required` The id of the selected country object |
| stateid   | number | `required` The id of the selected state object   |

## The Language Select Properties

Properties used to customise the rendering:

| Name               | Type     | Description                                                                                                                                |
| ------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| src       | string  | `optional` The relative or absolute URL where the data files are hosted. Default is to serve from hosted CDN. e.g., https://venkatmcajj.github.io/react-country-state-city/data                                          |
| defaultValue       | Country  | `optional` The current value: a country object                                                                                             |
| containerClassName | string   | `optional` styles for a container                                                                                                          |
| inputClassName     | string   | `optional` styles for input box                                                                                                            |
| onChange           | function | `optional` The current value: a country object.The argument is the country object                                                          |
| onTextChange       | function | `optional` A callback fired when the input text changes.                                                                                   |
| placeHolder        | string   | `optional` Placeholder text displayed in empty input                                                                                       |
| displayNative      | boolean  | `optional` value are used to display the languages in native language when is true and display in english when is false. default is false. |

## Region Select Properties

The same country select properties 

## Phonecode Select Properties

The same country select properties 

## Demo

[A demo is worth a thousand words](https://venkatmcajj.github.io/react-country-state-city/example)

## Contribute

Show your ❤️ and support by giving a ⭐. Any suggestions are welcome! venkatmcajj@gmail.com

## Financial Contributors

Buy me a cup of coffee,

Binance Smart Chain or Ethereum - 0x7C6Bfb7f240f6028Fd2a0039924826eD8B879635

## License

Licensed under MIT
