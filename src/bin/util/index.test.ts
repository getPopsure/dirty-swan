import {
  generatePrimaryColors,
  generateFont,
  readConfigurationFile,
  createConfigurationFile,
} from '.';

describe('Generate primary colors', () => {
  it('Should generate sass primary colors', () => {
    expect(
      generatePrimaryColors({
        theme: {
          colors: {
            primary: {
              100: '#FFA07A',
              300: '#E9967A',
              500: '#FA8072',
              700: '#F08080',
              900: '#CD5C5C',
            },
          },
        },
      })
    ).toEqual(
      `$ds-primary-100: #FFA07A;\n$ds-primary-300: #E9967A;\n$ds-primary-500: #FA8072;\n$ds-primary-700: #F08080;\n$ds-primary-900: #CD5C5C;`
    );
  });

  it('Shouldn’t generate sass primary colors if no entry for primary colors', () => {
    expect(generatePrimaryColors({})).toBeUndefined();
  });
});

describe('Generate font', () => {
  it('Should generate sass font with url', () => {
    expect(
      generateFont({
        theme: {
          font: {
            sans: {
              url:
                'https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap',
              family: ['Ubuntu', 'sans-serif'],
            },
          },
        },
      })
    ).toEqual(
      `@import url('https://fonts.googleapis.com/css2?family=Ubuntu:wght@400;700&display=swap');\n\n$font-family: 'Ubuntu', 'sans-serif';`
    );
  });

  it('Should generate sass font without url', () => {
    expect(
      generateFont({
        theme: {
          font: { sans: { family: ['Arial', 'Helvetica', 'sans-serif'] } },
        },
      })
    ).toEqual("$font-family: 'Arial', 'Helvetica', 'sans-serif';");
  });

  it('Shouldn’t generate sass font', () => {
    expect(generateFont({})).toBeUndefined();
  });
});

describe('Read configuration file', () => {
  it('Should read the configuration file', () => {
    expect(readConfigurationFile(`${__dirname}/test/data.json`)).toBeDefined();
  });
});
