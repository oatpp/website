(window.webpackJsonp=window.webpackJsonp||[]).push([[183],{555:function(a,s,t){"use strict";t.r(s);var e=t(42),r=Object(e.a)({},(function(){var a=this,s=a.$createElement,t=a._self._c||s;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"base64-hpp"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-hpp"}},[a._v("#")]),a._v(" Base64.hpp"),t("seo")],1),a._v(" "),t("p",[t("a",{attrs:{href:"https://github.com/oatpp/oatpp/blob/master/src/oatpp/encoding/Base64.hpp",target:"_blank",rel:"noopener noreferrer"}},[a._v("This File On Github"),t("OutboundLink")],1),t("br"),a._v(" "),t("a",{attrs:{href:"https://github.com/oatpp/oatpp/issues/new?title=API%20question&body=In%20file:%20oatpp/encoding/Base64.hpp%0A%0A%23%20Question%0A%0A%3Cyour-question-here%3E",target:"_blank",rel:"noopener noreferrer"}},[a._v("Ask A Question"),t("OutboundLink")],1)]),a._v(" "),t("p",[t("code",[a._v("API: latest")]),t("br"),a._v(" "),t("code",[a._v("module: oatpp")]),t("br"),a._v(" "),t("code",[a._v('#include "oatpp/encoding/Base64.hpp"')])]),a._v(" "),t("h2",{attrs:{id:"base64"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64"}},[a._v("#")]),a._v(" Base64")]),a._v(" "),t("p",[a._v("Base64 - encoder/decoder.")]),a._v(" "),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("namespace")]),a._v(" oatpp "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("namespace")]),a._v(" encoding "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" \n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Base64")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("h3",{attrs:{id:"fields"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#fields"}},[a._v("#")]),a._v(" Fields")]),a._v(" "),t("table",[t("thead",[t("tr",[t("th",[a._v("Type")]),a._v(" "),t("th",[a._v("Name")]),a._v(" "),t("th",[a._v("Summary")])])]),a._v(" "),t("tbody",[t("tr",[t("td",[t("code",[a._v("const char* const")])]),a._v(" "),t("td",[t("a",{attrs:{href:"#base64-alphabet-base64"}},[a._v("ALPHABET_BASE64")])]),a._v(" "),t("td",[a._v("Standard base64 Alphabet - "),t("code",[a._v("['A'-'Z', 'a'-'z', '0'-'9', '+', '/', '=']")]),a._v(". Alphabet is array of 65 chars. 64 chars encoding chars, and 65th padding char."),t("br")])]),a._v(" "),t("tr",[t("td",[t("code",[a._v("const char* const")])]),a._v(" "),t("td",[t("a",{attrs:{href:"#base64-alphabet-base64-url"}},[a._v("ALPHABET_BASE64_URL")])]),a._v(" "),t("td",[a._v("URL base64 Alphabet - "),t("code",[a._v("['A'-'Z', 'a'-'z', '0'-'9', '-', '_', '=']")]),a._v(". Alphabet is array of 65 chars. 64 chars encoding chars, and 65th padding char."),t("br")])]),a._v(" "),t("tr",[t("td",[t("code",[a._v("const char* const")])]),a._v(" "),t("td",[t("a",{attrs:{href:"#base64-alphabet-base64-url-safe"}},[a._v("ALPHABET_BASE64_URL_SAFE")])]),a._v(" "),t("td",[a._v("URL safe base64 Alphabet - "),t("code",[a._v("['A'-'Z', 'a'-'z', '0'-'9', '.', '_', '-']")]),a._v(". Alphabet is array of 65 chars. 64 chars encoding chars, and 65th padding char."),t("br")])]),a._v(" "),t("tr",[t("td",[t("code",[a._v("const char* const")])]),a._v(" "),t("td",[t("a",{attrs:{href:"#base64-alphabet-base64-auxiliary-chars"}},[a._v("ALPHABET_BASE64_AUXILIARY_CHARS")])]),a._v(" "),t("td",[a._v("Standard base64 Alphabet auxiliary chars ['+', '/', '=']. alphabet auxiliary chars - last 3 chars of alphabet including padding char.")])]),a._v(" "),t("tr",[t("td",[t("code",[a._v("const char* const")])]),a._v(" "),t("td",[t("a",{attrs:{href:"#base64-alphabet-base64-url-auxiliary-chars"}},[a._v("ALPHABET_BASE64_URL_AUXILIARY_CHARS")])]),a._v(" "),t("td",[a._v("URL base64 Alphabet auxiliary chars ['-', '_', '=']. alphabet auxiliary chars - last 3 chars of alphabet including padding char.")])]),a._v(" "),t("tr",[t("td",[t("code",[a._v("const char* const")])]),a._v(" "),t("td",[t("a",{attrs:{href:"#base64-alphabet-base64-url-safe-auxiliary-chars"}},[a._v("ALPHABET_BASE64_URL_SAFE_AUXILIARY_CHARS")])]),a._v(" "),t("td",[a._v("URL safe base64 Alphabet auxiliary chars ['.', '_', '=']. alphabet auxiliary chars - last 3 chars of alphabet including padding char.")])])])]),a._v(" "),t("h3",{attrs:{id:"methods"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#methods"}},[a._v("#")]),a._v(" Methods")]),a._v(" "),t("table",[t("thead",[t("tr",[t("th",[a._v("Return Type")]),a._v(" "),t("th",[a._v("Name")]),a._v(" "),t("th",[a._v("Summary")])])]),a._v(" "),t("tbody",[t("tr",[t("td",[t("code",[a._v("v_buff_size")])]),a._v(" "),t("td",[t("a",{attrs:{href:"#base64-calcencodedstringsize"}},[a._v("calcEncodedStringSize")])]),a._v(" "),t("td",[a._v("Calculate size of encoding result of a string of the given size.")])]),a._v(" "),t("tr",[t("td",[t("code",[a._v("v_buff_size")])]),a._v(" "),t("td",[t("a",{attrs:{href:"#base64-calcdecodedstringsize"}},[a._v("calcDecodedStringSize")])]),a._v(" "),t("td",[a._v("Calculate size of decoding result. this method assumes that data passed as a param consists of standard base64 set of chars")])]),a._v(" "),t("tr",[t("td",[t("code",[a._v("bool")])]),a._v(" "),t("td",[t("a",{attrs:{href:"#base64-isbase64string"}},[a._v("isBase64String")])]),a._v(" "),t("td",[a._v("Check if data is a valid base64 encoded string.")])]),a._v(" "),t("tr",[t("td",[t("code",[a._v("oatpp::String")])]),a._v(" "),t("td",[t("a",{attrs:{href:"#base64-encode"}},[a._v("encode")])]),a._v(" "),t("td",[a._v("Multiple implementations: "),t("br"),t("ol",[t("li",[a._v("Encode data as base64 string. ")]),t("li",[a._v("Encode data as base64 string. ")])])])]),a._v(" "),t("tr",[t("td",[t("code",[a._v("oatpp::String")])]),a._v(" "),t("td",[t("a",{attrs:{href:"#base64-decode"}},[a._v("decode")])]),a._v(" "),t("td",[a._v("Multiple implementations: "),t("br"),t("ol",[t("li",[a._v("Decode base64 encoded data. This method assumes that data passed as a param consists of standard base64 set of chars ")]),t("li",[a._v("Decode base64 encoded data. This method assumes that data passed as a param consists of standard base64 set of chars ")])])])])])]),a._v(" "),t("h3",{attrs:{id:"base64-alphabet-base64"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-alphabet-base64"}},[a._v("#")]),a._v(" Base64::ALPHABET_BASE64")]),a._v(" "),t("p",[a._v("Standard base64 Alphabet - "),t("code",[a._v("['A'-'Z', 'a'-'z', '0'-'9', '+', '/', '=']")]),a._v(". Alphabet is array of 65 chars. 64 chars encoding chars, and 65th padding char."),t("br")]),a._v(" "),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" ALPHABET_BASE64\n")])])]),t("h3",{attrs:{id:"base64-alphabet-base64-url"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-alphabet-base64-url"}},[a._v("#")]),a._v(" Base64::ALPHABET_BASE64_URL")]),a._v(" "),t("p",[a._v("URL base64 Alphabet - "),t("code",[a._v("['A'-'Z', 'a'-'z', '0'-'9', '-', '_', '=']")]),a._v(". Alphabet is array of 65 chars. 64 chars encoding chars, and 65th padding char."),t("br")]),a._v(" "),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" ALPHABET_BASE64_URL\n")])])]),t("h3",{attrs:{id:"base64-alphabet-base64-url-safe"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-alphabet-base64-url-safe"}},[a._v("#")]),a._v(" Base64::ALPHABET_BASE64_URL_SAFE")]),a._v(" "),t("p",[a._v("URL safe base64 Alphabet - "),t("code",[a._v("['A'-'Z', 'a'-'z', '0'-'9', '.', '_', '-']")]),a._v(". Alphabet is array of 65 chars. 64 chars encoding chars, and 65th padding char."),t("br")]),a._v(" "),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" ALPHABET_BASE64_URL_SAFE\n")])])]),t("h3",{attrs:{id:"base64-alphabet-base64-auxiliary-chars"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-alphabet-base64-auxiliary-chars"}},[a._v("#")]),a._v(" Base64::ALPHABET_BASE64_AUXILIARY_CHARS")]),a._v(" "),t("p",[a._v("Standard base64 Alphabet auxiliary chars ['+', '/', '=']. alphabet auxiliary chars - last 3 chars of alphabet including padding char.")]),a._v(" "),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" ALPHABET_BASE64_AUXILIARY_CHARS\n")])])]),t("h3",{attrs:{id:"base64-alphabet-base64-url-auxiliary-chars"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-alphabet-base64-url-auxiliary-chars"}},[a._v("#")]),a._v(" Base64::ALPHABET_BASE64_URL_AUXILIARY_CHARS")]),a._v(" "),t("p",[a._v("URL base64 Alphabet auxiliary chars ['-', '_', '=']. alphabet auxiliary chars - last 3 chars of alphabet including padding char.")]),a._v(" "),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" ALPHABET_BASE64_URL_AUXILIARY_CHARS\n")])])]),t("h3",{attrs:{id:"base64-alphabet-base64-url-safe-auxiliary-chars"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-alphabet-base64-url-safe-auxiliary-chars"}},[a._v("#")]),a._v(" Base64::ALPHABET_BASE64_URL_SAFE_AUXILIARY_CHARS")]),a._v(" "),t("p",[a._v("URL safe base64 Alphabet auxiliary chars ['.', '_', '=']. alphabet auxiliary chars - last 3 chars of alphabet including padding char.")]),a._v(" "),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" ALPHABET_BASE64_URL_SAFE_AUXILIARY_CHARS\n")])])]),t("h3",{attrs:{id:"base64-calcencodedstringsize"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-calcencodedstringsize"}},[a._v("#")]),a._v(" Base64::calcEncodedStringSize")]),a._v(" "),t("p",[a._v("Calculate size of encoding result of a string of the given size. "),t("ul",[t("li",[t("strong",[a._v("@param")]),a._v(" size - size of string to encode. ")]),t("li",[t("strong",[a._v("@return")]),a._v(" - size of encoding result of a string of the given size ")])])]),a._v(" "),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" v_buff_size "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("calcEncodedStringSize")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("v_buff_size size"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),t("h3",{attrs:{id:"base64-calcdecodedstringsize"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-calcdecodedstringsize"}},[a._v("#")]),a._v(" Base64::calcDecodedStringSize")]),a._v(" "),t("p",[a._v("Calculate size of decoding result. this method assumes that data passed as a param consists of standard base64 set of chars "),t("code",[a._v("['A'-'Z', 'a'-'z', '0'-'9']")]),a._v(" and three configurable auxiliary chars. "),t("ul",[t("li",[t("strong",[a._v("@param")]),a._v(" data - pointer to data. ")]),t("li",[t("strong",[a._v("@param")]),a._v(" size - size of the data. ")]),t("li",[t("strong",[a._v("@param")]),a._v(" base64StrLength - out parameter. Size of base64 valid encoded string. It may appear to be less then size. ")]),t("li",[t("strong",[a._v("@param")]),a._v(" auxiliaryChars - configurable auxiliary chars. ")]),t("li",[t("strong",[a._v("@return")]),a._v(" - size of decoded data. If data passed is not a base64 string then -1 is returned. ")])])]),a._v(" "),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" v_buff_size "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("calcDecodedStringSize")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" data"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" v_buff_size size"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" v_buff_size"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&")]),a._v(" base64StrLength"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" auxiliaryChars "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" ALPHABET_BASE64_AUXILIARY_CHARS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),t("h3",{attrs:{id:"base64-isbase64string"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-isbase64string"}},[a._v("#")]),a._v(" Base64::isBase64String")]),a._v(" "),t("p",[a._v("Check if data is a valid base64 encoded string. "),t("ul",[t("li",[t("strong",[a._v("@param")]),a._v(" data - pointer to data. ")]),t("li",[t("strong",[a._v("@param")]),a._v(" size - data size. ")]),t("li",[t("strong",[a._v("@param")]),a._v(" auxiliaryChars - configurable auxiliary chars. ")]),t("li",[t("strong",[a._v("@return")]),a._v(" "),t("code",[a._v("(calcDecodedStringSize(data, size, base64StrLength, auxiliaryChars) >= 0)")]),a._v(". ")])])]),a._v(" "),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("bool")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("isBase64String")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" data"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" v_buff_size size"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" auxiliaryChars "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" ALPHABET_BASE64_AUXILIARY_CHARS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])]),t("h3",{attrs:{id:"base64-encode"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-encode"}},[a._v("#")]),a._v(" Base64::encode")]),a._v(" "),t("ol",[t("li",[a._v("Encode data as base64 string. "),t("ul",[t("li",[t("strong",[a._v("@param")]),a._v(" data - pointer to data. ")]),t("li",[t("strong",[a._v("@param")]),a._v(" size - data size. ")]),t("li",[t("strong",[a._v("@param")]),a._v(" alphabet - base64 alphabet to use. ")]),t("li",[t("strong",[a._v("@return")]),a._v(" - encoded base64 string as "),t("RouterLink",{attrs:{to:"/api/latest/oatpp/core/Types/#string"}},[a._v("oatpp::String")]),a._v(". ")],1)]),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" oatpp"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("::")]),a._v("String "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("encode")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("void")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" data"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" v_buff_size size"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" alphabet "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" ALPHABET_BASE64"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])])]),a._v(" "),t("li",[a._v("Encode data as base64 string. "),t("ul",[t("li",[t("strong",[a._v("@param")]),a._v(" data - data to encode. ")]),t("li",[t("strong",[a._v("@param")]),a._v(" alphabet - base64 alphabet to use. ")]),t("li",[t("strong",[a._v("@return")]),a._v(" - encoded base64 string as "),t("RouterLink",{attrs:{to:"/api/latest/oatpp/core/Types/#string"}},[a._v("oatpp::String")]),a._v(". ")],1)]),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" oatpp"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("::")]),a._v("String "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("encode")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" oatpp"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("::")]),a._v("String"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&")]),a._v(" data"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" alphabet "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" ALPHABET_BASE64"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])])])]),a._v(" "),t("h3",{attrs:{id:"base64-decode"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-decode"}},[a._v("#")]),a._v(" Base64::decode")]),a._v(" "),t("ol",[t("li",[a._v("Decode base64 encoded data. This method assumes that data passed as a param consists of standard base64 set of chars "),t("code",[a._v("['A'-'Z', 'a'-'z', '0'-'9']")]),a._v(" and three configurable auxiliary chars. "),t("ul",[t("li",[t("strong",[a._v("@param")]),a._v(" data - pointer to data to decode. ")]),t("li",[t("strong",[a._v("@param")]),a._v(" size - encoded data size. ")]),t("li",[t("strong",[a._v("@param")]),a._v(" auxiliaryChars - configurable auxiliary chars. ")]),t("li",[t("strong",[a._v("@return")]),a._v(" - decoded data as "),t("RouterLink",{attrs:{to:"/api/latest/oatpp/core/Types/#string"}},[a._v("oatpp::String")]),a._v(". ")],1),t("li",[t("strong",[a._v("@throws")]),a._v(" - "),t("a",{attrs:{href:"#base64-decodingerror"}},[a._v("Base64::DecodingError")])])]),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" oatpp"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("::")]),a._v("String "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("decode")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" data"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" v_buff_size size"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" auxiliaryChars "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" ALPHABET_BASE64_AUXILIARY_CHARS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])])]),a._v(" "),t("li",[a._v("Decode base64 encoded data. This method assumes that data passed as a param consists of standard base64 set of chars "),t("code",[a._v("['A'-'Z', 'a'-'z', '0'-'9']")]),a._v(" and three configurable auxiliary chars. "),t("ul",[t("li",[t("strong",[a._v("@param")]),a._v(" data - data to decode. ")]),t("li",[t("strong",[a._v("@param")]),a._v(" auxiliaryChars - configurable auxiliary chars. ")]),t("li",[t("strong",[a._v("@return")]),a._v(" - decoded data as "),t("RouterLink",{attrs:{to:"/api/latest/oatpp/core/Types/#string"}},[a._v("oatpp::String")]),a._v(". ")],1),t("li",[t("strong",[a._v("@throws")]),a._v(" - "),t("a",{attrs:{href:"#base64-decodingerror"}},[a._v("Base64::DecodingError")])])]),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("static")]),a._v(" oatpp"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("::")]),a._v("String "),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("decode")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" oatpp"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("::")]),a._v("String"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("&")]),a._v(" data"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(",")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" auxiliaryChars "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("=")]),a._v(" ALPHABET_BASE64_AUXILIARY_CHARS"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])])])]),a._v(" "),t("h2",{attrs:{id:"base64-decodingerror"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-decodingerror"}},[a._v("#")]),a._v(" Base64::DecodingError")]),a._v(" "),t("p",[a._v("DecodingError.")]),a._v(" "),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("namespace")]),a._v(" oatpp "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("namespace")]),a._v(" encoding "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v(" \n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("Base64")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),a._v("\n    "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("class")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token class-name"}},[a._v("DecodingError")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("public")]),a._v(" std"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("::")]),a._v("runtime_error "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("{")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(";")]),a._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("}")]),a._v("\n")])])]),t("h3",{attrs:{id:"methods-2"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#methods-2"}},[a._v("#")]),a._v(" Methods")]),a._v(" "),t("table",[t("thead",[t("tr",[t("th",[a._v("Return Type")]),a._v(" "),t("th",[a._v("Name")]),a._v(" "),t("th",[a._v("Summary")])])]),a._v(" "),t("tbody",[t("tr",[t("td",[t("code",[a._v("[none]")])]),a._v(" "),t("td",[t("a",{attrs:{href:"#base64-decodingerror-decodingerror"}},[a._v("DecodingError")])]),a._v(" "),t("td",[a._v("Constructor.")])])])]),a._v(" "),t("h3",{attrs:{id:"base64-decodingerror-decodingerror"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#base64-decodingerror-decodingerror"}},[a._v("#")]),a._v(" Base64::DecodingError::DecodingError")]),a._v(" "),t("p",[a._v("Constructor. "),t("ul",[t("li",[t("strong",[a._v("@param")]),a._v(" message - error message. ")])])]),a._v(" "),t("div",{staticClass:"language-cpp extra-class"},[t("pre",{pre:!0,attrs:{class:"language-cpp"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[a._v("DecodingError")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("const")]),a._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[a._v("char")]),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("*")]),a._v(" message"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n  "),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v(":")]),a._v("std"),t("span",{pre:!0,attrs:{class:"token operator"}},[a._v("::")]),t("span",{pre:!0,attrs:{class:"token function"}},[a._v("runtime_error")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v("(")]),a._v("message"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[a._v(")")]),a._v("\n")])])])])}),[],!1,null,null,null);s.default=r.exports}}]);