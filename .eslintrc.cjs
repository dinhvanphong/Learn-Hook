
module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:react-hooks/recommended'
  ],
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  settings: { react: { version: '18.2' } },
  plugins: [
    'react',
    'react-hooks',
    'react-refresh'
  ],
  rules: {
    'react-refresh/only-export-components': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn', // Không có dependencies thì warning
    'react/prop-types': 0, 
    'react/display-name': 0,

    'no-console': 1, // Có console sẽ warning
    'no-lonely-if': 1, // if else if
    'no-unused-vars': 1, // Nếu biến k dc dùng đến thì warning
    'no-trailing-spaces': 1, // Thừa dấu space ở dòng thì warning
    'no-multi-spaces': 1, // [1, 2] chỉ dc thừa 1 khỏng trống trc số 2
    'no-multiple-empty-lines': 1, // Khônng dc để nhiều dòng trống
    'space-before-blocks': ['error', 'always'], // if (abc) {} để khoảng trống trc dấu {}
    'object-curly-spacing': [1, 'always'], // mở {} phải có khoảng trống
    'indent': ['warn', 2], // tab vào trong 2 khoảng trống
    'semi': [1, 'never'], // k để dấu ;
    'quotes': ['error', 'single'], // err khi khai báo biến dùng dấu " "
    'array-bracket-spacing': 1, // không để thừa khoảng trống ở arr
    'linebreak-style': 0, // xuống dòng code màn hình nhỏ
    'no-unexpected-multiline': 'warn', // Không xuống dòng các dòng code liền mạch
    'keyword-spacing': 1, // tạo khoảng cách giữa các key
    'comma-dangle': 1, // Không để dấu ; ở cuối object
    'comma-spacing': 1, // khai báo biến r đặt dấu , rồi tạo khoảng trống
    'arrow-spacing': 1 // arrow function phải có khoảng trống ở =>
  }
}

