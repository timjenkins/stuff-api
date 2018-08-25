module.exports = (binary) => {
  const len = binary.length();
  const b = binary.read(0, len);
  const buf = Buffer.alloc(len);

  for (let i = 0; i < len; i += 1) {
    buf[i] = b[i];
  }

  let hex = '';

  for (let i = 0; i < len; i += 1) {
    const n = buf.readUInt8(i);
    if (n < 16) {
      hex += `0${n.toString(16)}`;
    } else {
      hex += n.toString(16);
    }
  }

  const uuidStr = `${hex.substr(0, 8)}-${hex.substr(8, 4)}-${hex.substr(12, 4)}-${hex.substr(16, 4)}-${hex.substr(20, 12)}`;
  return uuidStr;
};
