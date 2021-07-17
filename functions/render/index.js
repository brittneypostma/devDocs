var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// node_modules/@sveltejs/kit/dist/install-fetch.js
function dataUriToBuffer(uri) {
  if (!/^data:/i.test(uri)) {
    throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');
  }
  uri = uri.replace(/\r?\n/g, "");
  const firstComma = uri.indexOf(",");
  if (firstComma === -1 || firstComma <= 4) {
    throw new TypeError("malformed data: URI");
  }
  const meta = uri.substring(5, firstComma).split(";");
  let charset = "";
  let base64 = false;
  const type = meta[0] || "text/plain";
  let typeFull = type;
  for (let i = 1; i < meta.length; i++) {
    if (meta[i] === "base64") {
      base64 = true;
    } else {
      typeFull += `;${meta[i]}`;
      if (meta[i].indexOf("charset=") === 0) {
        charset = meta[i].substring(8);
      }
    }
  }
  if (!meta[0] && !charset.length) {
    typeFull += ";charset=US-ASCII";
    charset = "US-ASCII";
  }
  const encoding = base64 ? "base64" : "ascii";
  const data = unescape(uri.substring(firstComma + 1));
  const buffer = Buffer.from(data, encoding);
  buffer.type = type;
  buffer.typeFull = typeFull;
  buffer.charset = charset;
  return buffer;
}
async function* read(parts) {
  for (const part of parts) {
    if ("stream" in part) {
      yield* part.stream();
    } else {
      yield part;
    }
  }
}
function isFormData(object) {
  return typeof object === "object" && typeof object.append === "function" && typeof object.set === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.delete === "function" && typeof object.keys === "function" && typeof object.values === "function" && typeof object.entries === "function" && typeof object.constructor === "function" && object[NAME] === "FormData";
}
function getHeader(boundary, name, field) {
  let header = "";
  header += `${dashes}${boundary}${carriage}`;
  header += `Content-Disposition: form-data; name="${name}"`;
  if (isBlob(field)) {
    header += `; filename="${field.name}"${carriage}`;
    header += `Content-Type: ${field.type || "application/octet-stream"}`;
  }
  return `${header}${carriage.repeat(2)}`;
}
async function* formDataIterator(form, boundary) {
  for (const [name, value] of form) {
    yield getHeader(boundary, name, value);
    if (isBlob(value)) {
      yield* value.stream();
    } else {
      yield value;
    }
    yield carriage;
  }
  yield getFooter(boundary);
}
function getFormDataLength(form, boundary) {
  let length = 0;
  for (const [name, value] of form) {
    length += Buffer.byteLength(getHeader(boundary, name, value));
    if (isBlob(value)) {
      length += value.size;
    } else {
      length += Buffer.byteLength(String(value));
    }
    length += carriageLength;
  }
  length += Buffer.byteLength(getFooter(boundary));
  return length;
}
async function consumeBody(data) {
  if (data[INTERNALS$2].disturbed) {
    throw new TypeError(`body used already for: ${data.url}`);
  }
  data[INTERNALS$2].disturbed = true;
  if (data[INTERNALS$2].error) {
    throw data[INTERNALS$2].error;
  }
  let { body } = data;
  if (body === null) {
    return Buffer.alloc(0);
  }
  if (isBlob(body)) {
    body = body.stream();
  }
  if (Buffer.isBuffer(body)) {
    return body;
  }
  if (!(body instanceof import_stream.default)) {
    return Buffer.alloc(0);
  }
  const accum = [];
  let accumBytes = 0;
  try {
    for await (const chunk of body) {
      if (data.size > 0 && accumBytes + chunk.length > data.size) {
        const err = new FetchError(`content size at ${data.url} over limit: ${data.size}`, "max-size");
        body.destroy(err);
        throw err;
      }
      accumBytes += chunk.length;
      accum.push(chunk);
    }
  } catch (error2) {
    if (error2 instanceof FetchBaseError) {
      throw error2;
    } else {
      throw new FetchError(`Invalid response body while trying to fetch ${data.url}: ${error2.message}`, "system", error2);
    }
  }
  if (body.readableEnded === true || body._readableState.ended === true) {
    try {
      if (accum.every((c) => typeof c === "string")) {
        return Buffer.from(accum.join(""));
      }
      return Buffer.concat(accum, accumBytes);
    } catch (error2) {
      throw new FetchError(`Could not create Buffer from response body for ${data.url}: ${error2.message}`, "system", error2);
    }
  } else {
    throw new FetchError(`Premature close of server response while trying to fetch ${data.url}`);
  }
}
function fromRawHeaders(headers = []) {
  return new Headers(headers.reduce((result, value, index2, array) => {
    if (index2 % 2 === 0) {
      result.push(array.slice(index2, index2 + 2));
    }
    return result;
  }, []).filter(([name, value]) => {
    try {
      validateHeaderName(name);
      validateHeaderValue(name, String(value));
      return true;
    } catch {
      return false;
    }
  }));
}
async function fetch(url, options_) {
  return new Promise((resolve2, reject) => {
    const request = new Request(url, options_);
    const options2 = getNodeRequestOptions(request);
    if (!supportedSchemas.has(options2.protocol)) {
      throw new TypeError(`node-fetch cannot load ${url}. URL scheme "${options2.protocol.replace(/:$/, "")}" is not supported.`);
    }
    if (options2.protocol === "data:") {
      const data = src(request.url);
      const response2 = new Response(data, { headers: { "Content-Type": data.typeFull } });
      resolve2(response2);
      return;
    }
    const send = (options2.protocol === "https:" ? import_https.default : import_http.default).request;
    const { signal } = request;
    let response = null;
    const abort = () => {
      const error2 = new AbortError("The operation was aborted.");
      reject(error2);
      if (request.body && request.body instanceof import_stream.default.Readable) {
        request.body.destroy(error2);
      }
      if (!response || !response.body) {
        return;
      }
      response.body.emit("error", error2);
    };
    if (signal && signal.aborted) {
      abort();
      return;
    }
    const abortAndFinalize = () => {
      abort();
      finalize();
    };
    const request_ = send(options2);
    if (signal) {
      signal.addEventListener("abort", abortAndFinalize);
    }
    const finalize = () => {
      request_.abort();
      if (signal) {
        signal.removeEventListener("abort", abortAndFinalize);
      }
    };
    request_.on("error", (err) => {
      reject(new FetchError(`request to ${request.url} failed, reason: ${err.message}`, "system", err));
      finalize();
    });
    request_.on("response", (response_) => {
      request_.setTimeout(0);
      const headers = fromRawHeaders(response_.rawHeaders);
      if (isRedirect(response_.statusCode)) {
        const location = headers.get("Location");
        const locationURL = location === null ? null : new URL(location, request.url);
        switch (request.redirect) {
          case "error":
            reject(new FetchError(`uri requested responds with a redirect, redirect mode is set to error: ${request.url}`, "no-redirect"));
            finalize();
            return;
          case "manual":
            if (locationURL !== null) {
              try {
                headers.set("Location", locationURL);
              } catch (error2) {
                reject(error2);
              }
            }
            break;
          case "follow": {
            if (locationURL === null) {
              break;
            }
            if (request.counter >= request.follow) {
              reject(new FetchError(`maximum redirect reached at: ${request.url}`, "max-redirect"));
              finalize();
              return;
            }
            const requestOptions = {
              headers: new Headers(request.headers),
              follow: request.follow,
              counter: request.counter + 1,
              agent: request.agent,
              compress: request.compress,
              method: request.method,
              body: request.body,
              signal: request.signal,
              size: request.size
            };
            if (response_.statusCode !== 303 && request.body && options_.body instanceof import_stream.default.Readable) {
              reject(new FetchError("Cannot follow redirect with body being a readable stream", "unsupported-redirect"));
              finalize();
              return;
            }
            if (response_.statusCode === 303 || (response_.statusCode === 301 || response_.statusCode === 302) && request.method === "POST") {
              requestOptions.method = "GET";
              requestOptions.body = void 0;
              requestOptions.headers.delete("content-length");
            }
            resolve2(fetch(new Request(locationURL, requestOptions)));
            finalize();
            return;
          }
        }
      }
      response_.once("end", () => {
        if (signal) {
          signal.removeEventListener("abort", abortAndFinalize);
        }
      });
      let body = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
        reject(error2);
      });
      if (process.version < "v12.10") {
        response_.on("aborted", abortAndFinalize);
      }
      const responseOptions = {
        url: request.url,
        status: response_.statusCode,
        statusText: response_.statusMessage,
        headers,
        size: request.size,
        counter: request.counter,
        highWaterMark: request.highWaterMark
      };
      const codings = headers.get("Content-Encoding");
      if (!request.compress || request.method === "HEAD" || codings === null || response_.statusCode === 204 || response_.statusCode === 304) {
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      const zlibOptions = {
        flush: import_zlib.default.Z_SYNC_FLUSH,
        finishFlush: import_zlib.default.Z_SYNC_FLUSH
      };
      if (codings === "gzip" || codings === "x-gzip") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createGunzip(zlibOptions), (error2) => {
          reject(error2);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      if (codings === "deflate" || codings === "x-deflate") {
        const raw = (0, import_stream.pipeline)(response_, new import_stream.PassThrough(), (error2) => {
          reject(error2);
        });
        raw.once("data", (chunk) => {
          if ((chunk[0] & 15) === 8) {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflate(), (error2) => {
              reject(error2);
            });
          } else {
            body = (0, import_stream.pipeline)(body, import_zlib.default.createInflateRaw(), (error2) => {
              reject(error2);
            });
          }
          response = new Response(body, responseOptions);
          resolve2(response);
        });
        return;
      }
      if (codings === "br") {
        body = (0, import_stream.pipeline)(body, import_zlib.default.createBrotliDecompress(), (error2) => {
          reject(error2);
        });
        response = new Response(body, responseOptions);
        resolve2(response);
        return;
      }
      response = new Response(body, responseOptions);
      resolve2(response);
    });
    writeToStream(request_, request);
  });
}
var import_http, import_https, import_zlib, import_stream, import_util, import_crypto, import_url, src, Readable, wm, Blob, fetchBlob, FetchBaseError, FetchError, NAME, isURLSearchParameters, isBlob, isAbortSignal, carriage, dashes, carriageLength, getFooter, getBoundary, INTERNALS$2, Body, clone, extractContentType, getTotalBytes, writeToStream, validateHeaderName, validateHeaderValue, Headers, redirectStatus, isRedirect, INTERNALS$1, Response, getSearch, INTERNALS, isRequest, Request, getNodeRequestOptions, AbortError, supportedSchemas;
var init_install_fetch = __esm({
  "node_modules/@sveltejs/kit/dist/install-fetch.js"() {
    init_shims();
    import_http = __toModule(require("http"));
    import_https = __toModule(require("https"));
    import_zlib = __toModule(require("zlib"));
    import_stream = __toModule(require("stream"));
    import_util = __toModule(require("util"));
    import_crypto = __toModule(require("crypto"));
    import_url = __toModule(require("url"));
    src = dataUriToBuffer;
    ({ Readable } = import_stream.default);
    wm = new WeakMap();
    Blob = class {
      constructor(blobParts = [], options2 = {}) {
        let size = 0;
        const parts = blobParts.map((element) => {
          let buffer;
          if (element instanceof Buffer) {
            buffer = element;
          } else if (ArrayBuffer.isView(element)) {
            buffer = Buffer.from(element.buffer, element.byteOffset, element.byteLength);
          } else if (element instanceof ArrayBuffer) {
            buffer = Buffer.from(element);
          } else if (element instanceof Blob) {
            buffer = element;
          } else {
            buffer = Buffer.from(typeof element === "string" ? element : String(element));
          }
          size += buffer.length || buffer.size || 0;
          return buffer;
        });
        const type = options2.type === void 0 ? "" : String(options2.type).toLowerCase();
        wm.set(this, {
          type: /[^\u0020-\u007E]/.test(type) ? "" : type,
          size,
          parts
        });
      }
      get size() {
        return wm.get(this).size;
      }
      get type() {
        return wm.get(this).type;
      }
      async text() {
        return Buffer.from(await this.arrayBuffer()).toString();
      }
      async arrayBuffer() {
        const data = new Uint8Array(this.size);
        let offset = 0;
        for await (const chunk of this.stream()) {
          data.set(chunk, offset);
          offset += chunk.length;
        }
        return data.buffer;
      }
      stream() {
        return Readable.from(read(wm.get(this).parts));
      }
      slice(start = 0, end = this.size, type = "") {
        const { size } = this;
        let relativeStart = start < 0 ? Math.max(size + start, 0) : Math.min(start, size);
        let relativeEnd = end < 0 ? Math.max(size + end, 0) : Math.min(end, size);
        const span = Math.max(relativeEnd - relativeStart, 0);
        const parts = wm.get(this).parts.values();
        const blobParts = [];
        let added = 0;
        for (const part of parts) {
          const size2 = ArrayBuffer.isView(part) ? part.byteLength : part.size;
          if (relativeStart && size2 <= relativeStart) {
            relativeStart -= size2;
            relativeEnd -= size2;
          } else {
            const chunk = part.slice(relativeStart, Math.min(size2, relativeEnd));
            blobParts.push(chunk);
            added += ArrayBuffer.isView(chunk) ? chunk.byteLength : chunk.size;
            relativeStart = 0;
            if (added >= span) {
              break;
            }
          }
        }
        const blob = new Blob([], { type: String(type).toLowerCase() });
        Object.assign(wm.get(blob), { size: span, parts: blobParts });
        return blob;
      }
      get [Symbol.toStringTag]() {
        return "Blob";
      }
      static [Symbol.hasInstance](object) {
        return object && typeof object === "object" && typeof object.stream === "function" && object.stream.length === 0 && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[Symbol.toStringTag]);
      }
    };
    Object.defineProperties(Blob.prototype, {
      size: { enumerable: true },
      type: { enumerable: true },
      slice: { enumerable: true }
    });
    fetchBlob = Blob;
    FetchBaseError = class extends Error {
      constructor(message, type) {
        super(message);
        Error.captureStackTrace(this, this.constructor);
        this.type = type;
      }
      get name() {
        return this.constructor.name;
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
    };
    FetchError = class extends FetchBaseError {
      constructor(message, type, systemError) {
        super(message, type);
        if (systemError) {
          this.code = this.errno = systemError.code;
          this.erroredSysCall = systemError.syscall;
        }
      }
    };
    NAME = Symbol.toStringTag;
    isURLSearchParameters = (object) => {
      return typeof object === "object" && typeof object.append === "function" && typeof object.delete === "function" && typeof object.get === "function" && typeof object.getAll === "function" && typeof object.has === "function" && typeof object.set === "function" && typeof object.sort === "function" && object[NAME] === "URLSearchParams";
    };
    isBlob = (object) => {
      return typeof object === "object" && typeof object.arrayBuffer === "function" && typeof object.type === "string" && typeof object.stream === "function" && typeof object.constructor === "function" && /^(Blob|File)$/.test(object[NAME]);
    };
    isAbortSignal = (object) => {
      return typeof object === "object" && object[NAME] === "AbortSignal";
    };
    carriage = "\r\n";
    dashes = "-".repeat(2);
    carriageLength = Buffer.byteLength(carriage);
    getFooter = (boundary) => `${dashes}${boundary}${dashes}${carriage.repeat(2)}`;
    getBoundary = () => (0, import_crypto.randomBytes)(8).toString("hex");
    INTERNALS$2 = Symbol("Body internals");
    Body = class {
      constructor(body, {
        size = 0
      } = {}) {
        let boundary = null;
        if (body === null) {
          body = null;
        } else if (isURLSearchParameters(body)) {
          body = Buffer.from(body.toString());
        } else if (isBlob(body))
          ;
        else if (Buffer.isBuffer(body))
          ;
        else if (import_util.types.isAnyArrayBuffer(body)) {
          body = Buffer.from(body);
        } else if (ArrayBuffer.isView(body)) {
          body = Buffer.from(body.buffer, body.byteOffset, body.byteLength);
        } else if (body instanceof import_stream.default)
          ;
        else if (isFormData(body)) {
          boundary = `NodeFetchFormDataBoundary${getBoundary()}`;
          body = import_stream.default.Readable.from(formDataIterator(body, boundary));
        } else {
          body = Buffer.from(String(body));
        }
        this[INTERNALS$2] = {
          body,
          boundary,
          disturbed: false,
          error: null
        };
        this.size = size;
        if (body instanceof import_stream.default) {
          body.on("error", (err) => {
            const error2 = err instanceof FetchBaseError ? err : new FetchError(`Invalid response body while trying to fetch ${this.url}: ${err.message}`, "system", err);
            this[INTERNALS$2].error = error2;
          });
        }
      }
      get body() {
        return this[INTERNALS$2].body;
      }
      get bodyUsed() {
        return this[INTERNALS$2].disturbed;
      }
      async arrayBuffer() {
        const { buffer, byteOffset, byteLength } = await consumeBody(this);
        return buffer.slice(byteOffset, byteOffset + byteLength);
      }
      async blob() {
        const ct = this.headers && this.headers.get("content-type") || this[INTERNALS$2].body && this[INTERNALS$2].body.type || "";
        const buf = await this.buffer();
        return new fetchBlob([buf], {
          type: ct
        });
      }
      async json() {
        const buffer = await consumeBody(this);
        return JSON.parse(buffer.toString());
      }
      async text() {
        const buffer = await consumeBody(this);
        return buffer.toString();
      }
      buffer() {
        return consumeBody(this);
      }
    };
    Object.defineProperties(Body.prototype, {
      body: { enumerable: true },
      bodyUsed: { enumerable: true },
      arrayBuffer: { enumerable: true },
      blob: { enumerable: true },
      json: { enumerable: true },
      text: { enumerable: true }
    });
    clone = (instance, highWaterMark) => {
      let p1;
      let p2;
      let { body } = instance;
      if (instance.bodyUsed) {
        throw new Error("cannot clone body after it is used");
      }
      if (body instanceof import_stream.default && typeof body.getBoundary !== "function") {
        p1 = new import_stream.PassThrough({ highWaterMark });
        p2 = new import_stream.PassThrough({ highWaterMark });
        body.pipe(p1);
        body.pipe(p2);
        instance[INTERNALS$2].body = p1;
        body = p2;
      }
      return body;
    };
    extractContentType = (body, request) => {
      if (body === null) {
        return null;
      }
      if (typeof body === "string") {
        return "text/plain;charset=UTF-8";
      }
      if (isURLSearchParameters(body)) {
        return "application/x-www-form-urlencoded;charset=UTF-8";
      }
      if (isBlob(body)) {
        return body.type || null;
      }
      if (Buffer.isBuffer(body) || import_util.types.isAnyArrayBuffer(body) || ArrayBuffer.isView(body)) {
        return null;
      }
      if (body && typeof body.getBoundary === "function") {
        return `multipart/form-data;boundary=${body.getBoundary()}`;
      }
      if (isFormData(body)) {
        return `multipart/form-data; boundary=${request[INTERNALS$2].boundary}`;
      }
      if (body instanceof import_stream.default) {
        return null;
      }
      return "text/plain;charset=UTF-8";
    };
    getTotalBytes = (request) => {
      const { body } = request;
      if (body === null) {
        return 0;
      }
      if (isBlob(body)) {
        return body.size;
      }
      if (Buffer.isBuffer(body)) {
        return body.length;
      }
      if (body && typeof body.getLengthSync === "function") {
        return body.hasKnownLength && body.hasKnownLength() ? body.getLengthSync() : null;
      }
      if (isFormData(body)) {
        return getFormDataLength(request[INTERNALS$2].boundary);
      }
      return null;
    };
    writeToStream = (dest, { body }) => {
      if (body === null) {
        dest.end();
      } else if (isBlob(body)) {
        body.stream().pipe(dest);
      } else if (Buffer.isBuffer(body)) {
        dest.write(body);
        dest.end();
      } else {
        body.pipe(dest);
      }
    };
    validateHeaderName = typeof import_http.default.validateHeaderName === "function" ? import_http.default.validateHeaderName : (name) => {
      if (!/^[\^`\-\w!#$%&'*+.|~]+$/.test(name)) {
        const err = new TypeError(`Header name must be a valid HTTP token [${name}]`);
        Object.defineProperty(err, "code", { value: "ERR_INVALID_HTTP_TOKEN" });
        throw err;
      }
    };
    validateHeaderValue = typeof import_http.default.validateHeaderValue === "function" ? import_http.default.validateHeaderValue : (name, value) => {
      if (/[^\t\u0020-\u007E\u0080-\u00FF]/.test(value)) {
        const err = new TypeError(`Invalid character in header content ["${name}"]`);
        Object.defineProperty(err, "code", { value: "ERR_INVALID_CHAR" });
        throw err;
      }
    };
    Headers = class extends URLSearchParams {
      constructor(init2) {
        let result = [];
        if (init2 instanceof Headers) {
          const raw = init2.raw();
          for (const [name, values] of Object.entries(raw)) {
            result.push(...values.map((value) => [name, value]));
          }
        } else if (init2 == null)
          ;
        else if (typeof init2 === "object" && !import_util.types.isBoxedPrimitive(init2)) {
          const method = init2[Symbol.iterator];
          if (method == null) {
            result.push(...Object.entries(init2));
          } else {
            if (typeof method !== "function") {
              throw new TypeError("Header pairs must be iterable");
            }
            result = [...init2].map((pair) => {
              if (typeof pair !== "object" || import_util.types.isBoxedPrimitive(pair)) {
                throw new TypeError("Each header pair must be an iterable object");
              }
              return [...pair];
            }).map((pair) => {
              if (pair.length !== 2) {
                throw new TypeError("Each header pair must be a name/value tuple");
              }
              return [...pair];
            });
          }
        } else {
          throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");
        }
        result = result.length > 0 ? result.map(([name, value]) => {
          validateHeaderName(name);
          validateHeaderValue(name, String(value));
          return [String(name).toLowerCase(), String(value)];
        }) : void 0;
        super(result);
        return new Proxy(this, {
          get(target, p, receiver) {
            switch (p) {
              case "append":
              case "set":
                return (name, value) => {
                  validateHeaderName(name);
                  validateHeaderValue(name, String(value));
                  return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase(), String(value));
                };
              case "delete":
              case "has":
              case "getAll":
                return (name) => {
                  validateHeaderName(name);
                  return URLSearchParams.prototype[p].call(receiver, String(name).toLowerCase());
                };
              case "keys":
                return () => {
                  target.sort();
                  return new Set(URLSearchParams.prototype.keys.call(target)).keys();
                };
              default:
                return Reflect.get(target, p, receiver);
            }
          }
        });
      }
      get [Symbol.toStringTag]() {
        return this.constructor.name;
      }
      toString() {
        return Object.prototype.toString.call(this);
      }
      get(name) {
        const values = this.getAll(name);
        if (values.length === 0) {
          return null;
        }
        let value = values.join(", ");
        if (/^content-encoding$/i.test(name)) {
          value = value.toLowerCase();
        }
        return value;
      }
      forEach(callback) {
        for (const name of this.keys()) {
          callback(this.get(name), name);
        }
      }
      *values() {
        for (const name of this.keys()) {
          yield this.get(name);
        }
      }
      *entries() {
        for (const name of this.keys()) {
          yield [name, this.get(name)];
        }
      }
      [Symbol.iterator]() {
        return this.entries();
      }
      raw() {
        return [...this.keys()].reduce((result, key) => {
          result[key] = this.getAll(key);
          return result;
        }, {});
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return [...this.keys()].reduce((result, key) => {
          const values = this.getAll(key);
          if (key === "host") {
            result[key] = values[0];
          } else {
            result[key] = values.length > 1 ? values : values[0];
          }
          return result;
        }, {});
      }
    };
    Object.defineProperties(Headers.prototype, ["get", "entries", "forEach", "values"].reduce((result, property) => {
      result[property] = { enumerable: true };
      return result;
    }, {}));
    redirectStatus = new Set([301, 302, 303, 307, 308]);
    isRedirect = (code) => {
      return redirectStatus.has(code);
    };
    INTERNALS$1 = Symbol("Response internals");
    Response = class extends Body {
      constructor(body = null, options2 = {}) {
        super(body, options2);
        const status = options2.status || 200;
        const headers = new Headers(options2.headers);
        if (body !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(body);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        this[INTERNALS$1] = {
          url: options2.url,
          status,
          statusText: options2.statusText || "",
          headers,
          counter: options2.counter,
          highWaterMark: options2.highWaterMark
        };
      }
      get url() {
        return this[INTERNALS$1].url || "";
      }
      get status() {
        return this[INTERNALS$1].status;
      }
      get ok() {
        return this[INTERNALS$1].status >= 200 && this[INTERNALS$1].status < 300;
      }
      get redirected() {
        return this[INTERNALS$1].counter > 0;
      }
      get statusText() {
        return this[INTERNALS$1].statusText;
      }
      get headers() {
        return this[INTERNALS$1].headers;
      }
      get highWaterMark() {
        return this[INTERNALS$1].highWaterMark;
      }
      clone() {
        return new Response(clone(this, this.highWaterMark), {
          url: this.url,
          status: this.status,
          statusText: this.statusText,
          headers: this.headers,
          ok: this.ok,
          redirected: this.redirected,
          size: this.size
        });
      }
      static redirect(url, status = 302) {
        if (!isRedirect(status)) {
          throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');
        }
        return new Response(null, {
          headers: {
            location: new URL(url).toString()
          },
          status
        });
      }
      get [Symbol.toStringTag]() {
        return "Response";
      }
    };
    Object.defineProperties(Response.prototype, {
      url: { enumerable: true },
      status: { enumerable: true },
      ok: { enumerable: true },
      redirected: { enumerable: true },
      statusText: { enumerable: true },
      headers: { enumerable: true },
      clone: { enumerable: true }
    });
    getSearch = (parsedURL) => {
      if (parsedURL.search) {
        return parsedURL.search;
      }
      const lastOffset = parsedURL.href.length - 1;
      const hash2 = parsedURL.hash || (parsedURL.href[lastOffset] === "#" ? "#" : "");
      return parsedURL.href[lastOffset - hash2.length] === "?" ? "?" : "";
    };
    INTERNALS = Symbol("Request internals");
    isRequest = (object) => {
      return typeof object === "object" && typeof object[INTERNALS] === "object";
    };
    Request = class extends Body {
      constructor(input, init2 = {}) {
        let parsedURL;
        if (isRequest(input)) {
          parsedURL = new URL(input.url);
        } else {
          parsedURL = new URL(input);
          input = {};
        }
        let method = init2.method || input.method || "GET";
        method = method.toUpperCase();
        if ((init2.body != null || isRequest(input)) && input.body !== null && (method === "GET" || method === "HEAD")) {
          throw new TypeError("Request with GET/HEAD method cannot have body");
        }
        const inputBody = init2.body ? init2.body : isRequest(input) && input.body !== null ? clone(input) : null;
        super(inputBody, {
          size: init2.size || input.size || 0
        });
        const headers = new Headers(init2.headers || input.headers || {});
        if (inputBody !== null && !headers.has("Content-Type")) {
          const contentType = extractContentType(inputBody, this);
          if (contentType) {
            headers.append("Content-Type", contentType);
          }
        }
        let signal = isRequest(input) ? input.signal : null;
        if ("signal" in init2) {
          signal = init2.signal;
        }
        if (signal !== null && !isAbortSignal(signal)) {
          throw new TypeError("Expected signal to be an instanceof AbortSignal");
        }
        this[INTERNALS] = {
          method,
          redirect: init2.redirect || input.redirect || "follow",
          headers,
          parsedURL,
          signal
        };
        this.follow = init2.follow === void 0 ? input.follow === void 0 ? 20 : input.follow : init2.follow;
        this.compress = init2.compress === void 0 ? input.compress === void 0 ? true : input.compress : init2.compress;
        this.counter = init2.counter || input.counter || 0;
        this.agent = init2.agent || input.agent;
        this.highWaterMark = init2.highWaterMark || input.highWaterMark || 16384;
        this.insecureHTTPParser = init2.insecureHTTPParser || input.insecureHTTPParser || false;
      }
      get method() {
        return this[INTERNALS].method;
      }
      get url() {
        return (0, import_url.format)(this[INTERNALS].parsedURL);
      }
      get headers() {
        return this[INTERNALS].headers;
      }
      get redirect() {
        return this[INTERNALS].redirect;
      }
      get signal() {
        return this[INTERNALS].signal;
      }
      clone() {
        return new Request(this);
      }
      get [Symbol.toStringTag]() {
        return "Request";
      }
    };
    Object.defineProperties(Request.prototype, {
      method: { enumerable: true },
      url: { enumerable: true },
      headers: { enumerable: true },
      redirect: { enumerable: true },
      clone: { enumerable: true },
      signal: { enumerable: true }
    });
    getNodeRequestOptions = (request) => {
      const { parsedURL } = request[INTERNALS];
      const headers = new Headers(request[INTERNALS].headers);
      if (!headers.has("Accept")) {
        headers.set("Accept", "*/*");
      }
      let contentLengthValue = null;
      if (request.body === null && /^(post|put)$/i.test(request.method)) {
        contentLengthValue = "0";
      }
      if (request.body !== null) {
        const totalBytes = getTotalBytes(request);
        if (typeof totalBytes === "number" && !Number.isNaN(totalBytes)) {
          contentLengthValue = String(totalBytes);
        }
      }
      if (contentLengthValue) {
        headers.set("Content-Length", contentLengthValue);
      }
      if (!headers.has("User-Agent")) {
        headers.set("User-Agent", "node-fetch");
      }
      if (request.compress && !headers.has("Accept-Encoding")) {
        headers.set("Accept-Encoding", "gzip,deflate,br");
      }
      let { agent } = request;
      if (typeof agent === "function") {
        agent = agent(parsedURL);
      }
      if (!headers.has("Connection") && !agent) {
        headers.set("Connection", "close");
      }
      const search = getSearch(parsedURL);
      const requestOptions = {
        path: parsedURL.pathname + search,
        pathname: parsedURL.pathname,
        hostname: parsedURL.hostname,
        protocol: parsedURL.protocol,
        port: parsedURL.port,
        hash: parsedURL.hash,
        search: parsedURL.search,
        query: parsedURL.query,
        href: parsedURL.href,
        method: request.method,
        headers: headers[Symbol.for("nodejs.util.inspect.custom")](),
        insecureHTTPParser: request.insecureHTTPParser,
        agent
      };
      return requestOptions;
    };
    AbortError = class extends FetchBaseError {
      constructor(message, type = "aborted") {
        super(message, type);
      }
    };
    supportedSchemas = new Set(["data:", "http:", "https:"]);
  }
});

// node_modules/@sveltejs/adapter-netlify/files/shims.js
var init_shims = __esm({
  "node_modules/@sveltejs/adapter-netlify/files/shims.js"() {
    init_install_fetch();
  }
});

// node_modules/marked/lib/marked.js
var require_marked = __commonJS({
  "node_modules/marked/lib/marked.js"(exports2, module2) {
    init_shims();
    (function(root) {
      "use strict";
      var block = {
        newline: /^\n+/,
        code: /^( {4}[^\n]+\n*)+/,
        fences: /^ {0,3}(`{3,}|~{3,})([^`~\n]*)\n(?:|([\s\S]*?)\n)(?: {0,3}\1[~`]* *(?:\n+|$)|$)/,
        hr: /^ {0,3}((?:- *){3,}|(?:_ *){3,}|(?:\* *){3,})(?:\n+|$)/,
        heading: /^ {0,3}(#{1,6}) +([^\n]*?)(?: +#+)? *(?:\n+|$)/,
        blockquote: /^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,
        list: /^( {0,3})(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
        html: "^ {0,3}(?:<(script|pre|style)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?\\?>\\n*|<![A-Z][\\s\\S]*?>\\n*|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\n*|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:\\n{2,}|$)|<(?!script|pre|style)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$)|</(?!script|pre|style)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:\\n{2,}|$))",
        def: /^ {0,3}\[(label)\]: *\n? *<?([^\s>]+)>?(?:(?: +\n? *| *\n *)(title))? *(?:\n+|$)/,
        nptable: noop2,
        table: noop2,
        lheading: /^([^\n]+)\n {0,3}(=+|-+) *(?:\n+|$)/,
        _paragraph: /^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html)[^\n]+)*)/,
        text: /^[^\n]+/
      };
      block._label = /(?!\s*\])(?:\\[\[\]]|[^\[\]])+/;
      block._title = /(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/;
      block.def = edit(block.def).replace("label", block._label).replace("title", block._title).getRegex();
      block.bullet = /(?:[*+-]|\d{1,9}\.)/;
      block.item = /^( *)(bull) ?[^\n]*(?:\n(?!\1bull ?)[^\n]*)*/;
      block.item = edit(block.item, "gm").replace(/bull/g, block.bullet).getRegex();
      block.list = edit(block.list).replace(/bull/g, block.bullet).replace("hr", "\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def", "\\n+(?=" + block.def.source + ")").getRegex();
      block._tag = "address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul";
      block._comment = /<!--(?!-?>)[\s\S]*?-->/;
      block.html = edit(block.html, "i").replace("comment", block._comment).replace("tag", block._tag).replace("attribute", / +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex();
      block.paragraph = edit(block._paragraph).replace("hr", block.hr).replace("heading", " {0,3}#{1,6} +").replace("|lheading", "").replace("blockquote", " {0,3}>").replace("fences", " {0,3}(?:`{3,}|~{3,})[^`\\n]*\\n").replace("list", " {0,3}(?:[*+-]|1[.)]) ").replace("html", "</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|!--)").replace("tag", block._tag).getRegex();
      block.blockquote = edit(block.blockquote).replace("paragraph", block.paragraph).getRegex();
      block.normal = merge({}, block);
      block.gfm = merge({}, block.normal, {
        nptable: /^ *([^|\n ].*\|.*)\n *([-:]+ *\|[-| :]*)(?:\n((?:.*[^>\n ].*(?:\n|$))*)\n*|$)/,
        table: /^ *\|(.+)\n *\|?( *[-:]+[-| :]*)(?:\n((?: *[^>\n ].*(?:\n|$))*)\n*|$)/
      });
      block.pedantic = merge({}, block.normal, {
        html: edit(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment", block._comment).replace(/tag/g, "(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),
        def: /^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,
        heading: /^ *(#{1,6}) *([^\n]+?) *(?:#+ *)?(?:\n+|$)/,
        fences: noop2,
        paragraph: edit(block.normal._paragraph).replace("hr", block.hr).replace("heading", " *#{1,6} *[^\n]").replace("lheading", block.lheading).replace("blockquote", " {0,3}>").replace("|fences", "").replace("|list", "").replace("|html", "").getRegex()
      });
      function Lexer(options2) {
        this.tokens = [];
        this.tokens.links = Object.create(null);
        this.options = options2 || marked2.defaults;
        this.rules = block.normal;
        if (this.options.pedantic) {
          this.rules = block.pedantic;
        } else if (this.options.gfm) {
          this.rules = block.gfm;
        }
      }
      Lexer.rules = block;
      Lexer.lex = function(src2, options2) {
        var lexer = new Lexer(options2);
        return lexer.lex(src2);
      };
      Lexer.prototype.lex = function(src2) {
        src2 = src2.replace(/\r\n|\r/g, "\n").replace(/\t/g, "    ").replace(/\u00a0/g, " ").replace(/\u2424/g, "\n");
        return this.token(src2, true);
      };
      Lexer.prototype.token = function(src2, top) {
        src2 = src2.replace(/^ +$/gm, "");
        var next, loose, cap, bull, b, item, listStart, listItems, t, space, i, tag, l, isordered, istask, ischecked;
        while (src2) {
          if (cap = this.rules.newline.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            if (cap[0].length > 1) {
              this.tokens.push({
                type: "space"
              });
            }
          }
          if (cap = this.rules.code.exec(src2)) {
            var lastToken = this.tokens[this.tokens.length - 1];
            src2 = src2.substring(cap[0].length);
            if (lastToken && lastToken.type === "paragraph") {
              lastToken.text += "\n" + cap[0].trimRight();
            } else {
              cap = cap[0].replace(/^ {4}/gm, "");
              this.tokens.push({
                type: "code",
                codeBlockStyle: "indented",
                text: !this.options.pedantic ? rtrim(cap, "\n") : cap
              });
            }
            continue;
          }
          if (cap = this.rules.fences.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            this.tokens.push({
              type: "code",
              lang: cap[2] ? cap[2].trim() : cap[2],
              text: cap[3] || ""
            });
            continue;
          }
          if (cap = this.rules.heading.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            this.tokens.push({
              type: "heading",
              depth: cap[1].length,
              text: cap[2]
            });
            continue;
          }
          if (cap = this.rules.nptable.exec(src2)) {
            item = {
              type: "table",
              header: splitCells(cap[1].replace(/^ *| *\| *$/g, "")),
              align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
              cells: cap[3] ? cap[3].replace(/\n$/, "").split("\n") : []
            };
            if (item.header.length === item.align.length) {
              src2 = src2.substring(cap[0].length);
              for (i = 0; i < item.align.length; i++) {
                if (/^ *-+: *$/.test(item.align[i])) {
                  item.align[i] = "right";
                } else if (/^ *:-+: *$/.test(item.align[i])) {
                  item.align[i] = "center";
                } else if (/^ *:-+ *$/.test(item.align[i])) {
                  item.align[i] = "left";
                } else {
                  item.align[i] = null;
                }
              }
              for (i = 0; i < item.cells.length; i++) {
                item.cells[i] = splitCells(item.cells[i], item.header.length);
              }
              this.tokens.push(item);
              continue;
            }
          }
          if (cap = this.rules.hr.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            this.tokens.push({
              type: "hr"
            });
            continue;
          }
          if (cap = this.rules.blockquote.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            this.tokens.push({
              type: "blockquote_start"
            });
            cap = cap[0].replace(/^ *> ?/gm, "");
            this.token(cap, top);
            this.tokens.push({
              type: "blockquote_end"
            });
            continue;
          }
          if (cap = this.rules.list.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            bull = cap[2];
            isordered = bull.length > 1;
            listStart = {
              type: "list_start",
              ordered: isordered,
              start: isordered ? +bull : "",
              loose: false
            };
            this.tokens.push(listStart);
            cap = cap[0].match(this.rules.item);
            listItems = [];
            next = false;
            l = cap.length;
            i = 0;
            for (; i < l; i++) {
              item = cap[i];
              space = item.length;
              item = item.replace(/^ *([*+-]|\d+\.) */, "");
              if (~item.indexOf("\n ")) {
                space -= item.length;
                item = !this.options.pedantic ? item.replace(new RegExp("^ {1," + space + "}", "gm"), "") : item.replace(/^ {1,4}/gm, "");
              }
              if (i !== l - 1) {
                b = block.bullet.exec(cap[i + 1])[0];
                if (bull.length > 1 ? b.length === 1 : b.length > 1 || this.options.smartLists && b !== bull) {
                  src2 = cap.slice(i + 1).join("\n") + src2;
                  i = l - 1;
                }
              }
              loose = next || /\n\n(?!\s*$)/.test(item);
              if (i !== l - 1) {
                next = item.charAt(item.length - 1) === "\n";
                if (!loose)
                  loose = next;
              }
              if (loose) {
                listStart.loose = true;
              }
              istask = /^\[[ xX]\] /.test(item);
              ischecked = void 0;
              if (istask) {
                ischecked = item[1] !== " ";
                item = item.replace(/^\[[ xX]\] +/, "");
              }
              t = {
                type: "list_item_start",
                task: istask,
                checked: ischecked,
                loose
              };
              listItems.push(t);
              this.tokens.push(t);
              this.token(item, false);
              this.tokens.push({
                type: "list_item_end"
              });
            }
            if (listStart.loose) {
              l = listItems.length;
              i = 0;
              for (; i < l; i++) {
                listItems[i].loose = true;
              }
            }
            this.tokens.push({
              type: "list_end"
            });
            continue;
          }
          if (cap = this.rules.html.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            this.tokens.push({
              type: this.options.sanitize ? "paragraph" : "html",
              pre: !this.options.sanitizer && (cap[1] === "pre" || cap[1] === "script" || cap[1] === "style"),
              text: this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape3(cap[0]) : cap[0]
            });
            continue;
          }
          if (top && (cap = this.rules.def.exec(src2))) {
            src2 = src2.substring(cap[0].length);
            if (cap[3])
              cap[3] = cap[3].substring(1, cap[3].length - 1);
            tag = cap[1].toLowerCase().replace(/\s+/g, " ");
            if (!this.tokens.links[tag]) {
              this.tokens.links[tag] = {
                href: cap[2],
                title: cap[3]
              };
            }
            continue;
          }
          if (cap = this.rules.table.exec(src2)) {
            item = {
              type: "table",
              header: splitCells(cap[1].replace(/^ *| *\| *$/g, "")),
              align: cap[2].replace(/^ *|\| *$/g, "").split(/ *\| */),
              cells: cap[3] ? cap[3].replace(/\n$/, "").split("\n") : []
            };
            if (item.header.length === item.align.length) {
              src2 = src2.substring(cap[0].length);
              for (i = 0; i < item.align.length; i++) {
                if (/^ *-+: *$/.test(item.align[i])) {
                  item.align[i] = "right";
                } else if (/^ *:-+: *$/.test(item.align[i])) {
                  item.align[i] = "center";
                } else if (/^ *:-+ *$/.test(item.align[i])) {
                  item.align[i] = "left";
                } else {
                  item.align[i] = null;
                }
              }
              for (i = 0; i < item.cells.length; i++) {
                item.cells[i] = splitCells(item.cells[i].replace(/^ *\| *| *\| *$/g, ""), item.header.length);
              }
              this.tokens.push(item);
              continue;
            }
          }
          if (cap = this.rules.lheading.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            this.tokens.push({
              type: "heading",
              depth: cap[2].charAt(0) === "=" ? 1 : 2,
              text: cap[1]
            });
            continue;
          }
          if (top && (cap = this.rules.paragraph.exec(src2))) {
            src2 = src2.substring(cap[0].length);
            this.tokens.push({
              type: "paragraph",
              text: cap[1].charAt(cap[1].length - 1) === "\n" ? cap[1].slice(0, -1) : cap[1]
            });
            continue;
          }
          if (cap = this.rules.text.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            this.tokens.push({
              type: "text",
              text: cap[0]
            });
            continue;
          }
          if (src2) {
            throw new Error("Infinite loop on byte: " + src2.charCodeAt(0));
          }
        }
        return this.tokens;
      };
      var inline = {
        escape: /^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,
        autolink: /^<(scheme:[^\s\x00-\x1f<>]*|email)>/,
        url: noop2,
        tag: "^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",
        link: /^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,
        reflink: /^!?\[(label)\]\[(?!\s*\])((?:\\[\[\]]?|[^\[\]\\])+)\]/,
        nolink: /^!?\[(?!\s*\])((?:\[[^\[\]]*\]|\\[\[\]]|[^\[\]])*)\](?:\[\])?/,
        strong: /^__([^\s_])__(?!_)|^\*\*([^\s*])\*\*(?!\*)|^__([^\s][\s\S]*?[^\s])__(?!_)|^\*\*([^\s][\s\S]*?[^\s])\*\*(?!\*)/,
        em: /^_([^\s_])_(?!_)|^\*([^\s*<\[])\*(?!\*)|^_([^\s<][\s\S]*?[^\s_])_(?!_|[^\spunctuation])|^_([^\s_<][\s\S]*?[^\s])_(?!_|[^\spunctuation])|^\*([^\s<"][\s\S]*?[^\s\*])\*(?!\*|[^\spunctuation])|^\*([^\s*"<\[][\s\S]*?[^\s])\*(?!\*)/,
        code: /^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,
        br: /^( {2,}|\\)\n(?!\s*$)/,
        del: noop2,
        text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*]|\b_|$)|[^ ](?= {2,}\n))|(?= {2,}\n))/
      };
      inline._punctuation = `!"#$%&'()*+,\\-./:;<=>?@\\[^_{|}~`;
      inline.em = edit(inline.em).replace(/punctuation/g, inline._punctuation).getRegex();
      inline._escapes = /\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g;
      inline._scheme = /[a-zA-Z][a-zA-Z0-9+.-]{1,31}/;
      inline._email = /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/;
      inline.autolink = edit(inline.autolink).replace("scheme", inline._scheme).replace("email", inline._email).getRegex();
      inline._attribute = /\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/;
      inline.tag = edit(inline.tag).replace("comment", block._comment).replace("attribute", inline._attribute).getRegex();
      inline._label = /(?:\[[^\[\]]*\]|\\.|`[^`]*`|[^\[\]\\`])*?/;
      inline._href = /<(?:\\[<>]?|[^\s<>\\])*>|[^\s\x00-\x1f]*/;
      inline._title = /"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/;
      inline.link = edit(inline.link).replace("label", inline._label).replace("href", inline._href).replace("title", inline._title).getRegex();
      inline.reflink = edit(inline.reflink).replace("label", inline._label).getRegex();
      inline.normal = merge({}, inline);
      inline.pedantic = merge({}, inline.normal, {
        strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
        em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/,
        link: edit(/^!?\[(label)\]\((.*?)\)/).replace("label", inline._label).getRegex(),
        reflink: edit(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label", inline._label).getRegex()
      });
      inline.gfm = merge({}, inline.normal, {
        escape: edit(inline.escape).replace("])", "~|])").getRegex(),
        _extended_email: /[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,
        url: /^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,
        _backpedal: /(?:[^?!.,:;*_~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_~)]+(?!$))+/,
        del: /^~+(?=\S)([\s\S]*?\S)~+/,
        text: /^(`+|[^`])(?:[\s\S]*?(?:(?=[\\<!\[`*~]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))|(?= {2,}\n|[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))/
      });
      inline.gfm.url = edit(inline.gfm.url, "i").replace("email", inline.gfm._extended_email).getRegex();
      inline.breaks = merge({}, inline.gfm, {
        br: edit(inline.br).replace("{2,}", "*").getRegex(),
        text: edit(inline.gfm.text).replace("\\b_", "\\b_| {2,}\\n").replace(/\{2,\}/g, "*").getRegex()
      });
      function InlineLexer(links, options2) {
        this.options = options2 || marked2.defaults;
        this.links = links;
        this.rules = inline.normal;
        this.renderer = this.options.renderer || new Renderer();
        this.renderer.options = this.options;
        if (!this.links) {
          throw new Error("Tokens array requires a `links` property.");
        }
        if (this.options.pedantic) {
          this.rules = inline.pedantic;
        } else if (this.options.gfm) {
          if (this.options.breaks) {
            this.rules = inline.breaks;
          } else {
            this.rules = inline.gfm;
          }
        }
      }
      InlineLexer.rules = inline;
      InlineLexer.output = function(src2, links, options2) {
        var inline2 = new InlineLexer(links, options2);
        return inline2.output(src2);
      };
      InlineLexer.prototype.output = function(src2) {
        var out = "", link, text, href, title, cap, prevCapZero;
        while (src2) {
          if (cap = this.rules.escape.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            out += escape3(cap[1]);
            continue;
          }
          if (cap = this.rules.tag.exec(src2)) {
            if (!this.inLink && /^<a /i.test(cap[0])) {
              this.inLink = true;
            } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
              this.inLink = false;
            }
            if (!this.inRawBlock && /^<(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
              this.inRawBlock = true;
            } else if (this.inRawBlock && /^<\/(pre|code|kbd|script)(\s|>)/i.test(cap[0])) {
              this.inRawBlock = false;
            }
            src2 = src2.substring(cap[0].length);
            out += this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape3(cap[0]) : cap[0];
            continue;
          }
          if (cap = this.rules.link.exec(src2)) {
            var lastParenIndex = findClosingBracket(cap[2], "()");
            if (lastParenIndex > -1) {
              var linkLen = 4 + cap[1].length + lastParenIndex;
              cap[2] = cap[2].substring(0, lastParenIndex);
              cap[0] = cap[0].substring(0, linkLen).trim();
              cap[3] = "";
            }
            src2 = src2.substring(cap[0].length);
            this.inLink = true;
            href = cap[2];
            if (this.options.pedantic) {
              link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);
              if (link) {
                href = link[1];
                title = link[3];
              } else {
                title = "";
              }
            } else {
              title = cap[3] ? cap[3].slice(1, -1) : "";
            }
            href = href.trim().replace(/^<([\s\S]*)>$/, "$1");
            out += this.outputLink(cap, {
              href: InlineLexer.escapes(href),
              title: InlineLexer.escapes(title)
            });
            this.inLink = false;
            continue;
          }
          if ((cap = this.rules.reflink.exec(src2)) || (cap = this.rules.nolink.exec(src2))) {
            src2 = src2.substring(cap[0].length);
            link = (cap[2] || cap[1]).replace(/\s+/g, " ");
            link = this.links[link.toLowerCase()];
            if (!link || !link.href) {
              out += cap[0].charAt(0);
              src2 = cap[0].substring(1) + src2;
              continue;
            }
            this.inLink = true;
            out += this.outputLink(cap, link);
            this.inLink = false;
            continue;
          }
          if (cap = this.rules.strong.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            out += this.renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
            continue;
          }
          if (cap = this.rules.em.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            out += this.renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
            continue;
          }
          if (cap = this.rules.code.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            out += this.renderer.codespan(escape3(cap[2].trim(), true));
            continue;
          }
          if (cap = this.rules.br.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            out += this.renderer.br();
            continue;
          }
          if (cap = this.rules.del.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            out += this.renderer.del(this.output(cap[1]));
            continue;
          }
          if (cap = this.rules.autolink.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            if (cap[2] === "@") {
              text = escape3(this.mangle(cap[1]));
              href = "mailto:" + text;
            } else {
              text = escape3(cap[1]);
              href = text;
            }
            out += this.renderer.link(href, null, text);
            continue;
          }
          if (!this.inLink && (cap = this.rules.url.exec(src2))) {
            if (cap[2] === "@") {
              text = escape3(cap[0]);
              href = "mailto:" + text;
            } else {
              do {
                prevCapZero = cap[0];
                cap[0] = this.rules._backpedal.exec(cap[0])[0];
              } while (prevCapZero !== cap[0]);
              text = escape3(cap[0]);
              if (cap[1] === "www.") {
                href = "http://" + text;
              } else {
                href = text;
              }
            }
            src2 = src2.substring(cap[0].length);
            out += this.renderer.link(href, null, text);
            continue;
          }
          if (cap = this.rules.text.exec(src2)) {
            src2 = src2.substring(cap[0].length);
            if (this.inRawBlock) {
              out += this.renderer.text(this.options.sanitize ? this.options.sanitizer ? this.options.sanitizer(cap[0]) : escape3(cap[0]) : cap[0]);
            } else {
              out += this.renderer.text(escape3(this.smartypants(cap[0])));
            }
            continue;
          }
          if (src2) {
            throw new Error("Infinite loop on byte: " + src2.charCodeAt(0));
          }
        }
        return out;
      };
      InlineLexer.escapes = function(text) {
        return text ? text.replace(InlineLexer.rules._escapes, "$1") : text;
      };
      InlineLexer.prototype.outputLink = function(cap, link) {
        var href = link.href, title = link.title ? escape3(link.title) : null;
        return cap[0].charAt(0) !== "!" ? this.renderer.link(href, title, this.output(cap[1])) : this.renderer.image(href, title, escape3(cap[1]));
      };
      InlineLexer.prototype.smartypants = function(text) {
        if (!this.options.smartypants)
          return text;
        return text.replace(/---/g, "\u2014").replace(/--/g, "\u2013").replace(/(^|[-\u2014/(\[{"\s])'/g, "$1\u2018").replace(/'/g, "\u2019").replace(/(^|[-\u2014/(\[{\u2018\s])"/g, "$1\u201C").replace(/"/g, "\u201D").replace(/\.{3}/g, "\u2026");
      };
      InlineLexer.prototype.mangle = function(text) {
        if (!this.options.mangle)
          return text;
        var out = "", l = text.length, i = 0, ch;
        for (; i < l; i++) {
          ch = text.charCodeAt(i);
          if (Math.random() > 0.5) {
            ch = "x" + ch.toString(16);
          }
          out += "&#" + ch + ";";
        }
        return out;
      };
      function Renderer(options2) {
        this.options = options2 || marked2.defaults;
      }
      Renderer.prototype.code = function(code, infostring, escaped3) {
        var lang = (infostring || "").match(/\S*/)[0];
        if (this.options.highlight) {
          var out = this.options.highlight(code, lang);
          if (out != null && out !== code) {
            escaped3 = true;
            code = out;
          }
        }
        if (!lang) {
          return "<pre><code>" + (escaped3 ? code : escape3(code, true)) + "</code></pre>";
        }
        return '<pre><code class="' + this.options.langPrefix + escape3(lang, true) + '">' + (escaped3 ? code : escape3(code, true)) + "</code></pre>\n";
      };
      Renderer.prototype.blockquote = function(quote) {
        return "<blockquote>\n" + quote + "</blockquote>\n";
      };
      Renderer.prototype.html = function(html) {
        return html;
      };
      Renderer.prototype.heading = function(text, level, raw, slugger) {
        if (this.options.headerIds) {
          return "<h" + level + ' id="' + this.options.headerPrefix + slugger.slug(raw) + '">' + text + "</h" + level + ">\n";
        }
        return "<h" + level + ">" + text + "</h" + level + ">\n";
      };
      Renderer.prototype.hr = function() {
        return this.options.xhtml ? "<hr/>\n" : "<hr>\n";
      };
      Renderer.prototype.list = function(body, ordered, start) {
        var type = ordered ? "ol" : "ul", startatt = ordered && start !== 1 ? ' start="' + start + '"' : "";
        return "<" + type + startatt + ">\n" + body + "</" + type + ">\n";
      };
      Renderer.prototype.listitem = function(text) {
        return "<li>" + text + "</li>\n";
      };
      Renderer.prototype.checkbox = function(checked) {
        return "<input " + (checked ? 'checked="" ' : "") + 'disabled="" type="checkbox"' + (this.options.xhtml ? " /" : "") + "> ";
      };
      Renderer.prototype.paragraph = function(text) {
        return "<p>" + text + "</p>\n";
      };
      Renderer.prototype.table = function(header, body) {
        if (body)
          body = "<tbody>" + body + "</tbody>";
        return "<table>\n<thead>\n" + header + "</thead>\n" + body + "</table>\n";
      };
      Renderer.prototype.tablerow = function(content) {
        return "<tr>\n" + content + "</tr>\n";
      };
      Renderer.prototype.tablecell = function(content, flags) {
        var type = flags.header ? "th" : "td";
        var tag = flags.align ? "<" + type + ' align="' + flags.align + '">' : "<" + type + ">";
        return tag + content + "</" + type + ">\n";
      };
      Renderer.prototype.strong = function(text) {
        return "<strong>" + text + "</strong>";
      };
      Renderer.prototype.em = function(text) {
        return "<em>" + text + "</em>";
      };
      Renderer.prototype.codespan = function(text) {
        return "<code>" + text + "</code>";
      };
      Renderer.prototype.br = function() {
        return this.options.xhtml ? "<br/>" : "<br>";
      };
      Renderer.prototype.del = function(text) {
        return "<del>" + text + "</del>";
      };
      Renderer.prototype.link = function(href, title, text) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }
        var out = '<a href="' + escape3(href) + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += ">" + text + "</a>";
        return out;
      };
      Renderer.prototype.image = function(href, title, text) {
        href = cleanUrl(this.options.sanitize, this.options.baseUrl, href);
        if (href === null) {
          return text;
        }
        var out = '<img src="' + href + '" alt="' + text + '"';
        if (title) {
          out += ' title="' + title + '"';
        }
        out += this.options.xhtml ? "/>" : ">";
        return out;
      };
      Renderer.prototype.text = function(text) {
        return text;
      };
      function TextRenderer() {
      }
      TextRenderer.prototype.strong = TextRenderer.prototype.em = TextRenderer.prototype.codespan = TextRenderer.prototype.del = TextRenderer.prototype.text = function(text) {
        return text;
      };
      TextRenderer.prototype.link = TextRenderer.prototype.image = function(href, title, text) {
        return "" + text;
      };
      TextRenderer.prototype.br = function() {
        return "";
      };
      function Parser(options2) {
        this.tokens = [];
        this.token = null;
        this.options = options2 || marked2.defaults;
        this.options.renderer = this.options.renderer || new Renderer();
        this.renderer = this.options.renderer;
        this.renderer.options = this.options;
        this.slugger = new Slugger();
      }
      Parser.parse = function(src2, options2) {
        var parser = new Parser(options2);
        return parser.parse(src2);
      };
      Parser.prototype.parse = function(src2) {
        this.inline = new InlineLexer(src2.links, this.options);
        this.inlineText = new InlineLexer(src2.links, merge({}, this.options, { renderer: new TextRenderer() }));
        this.tokens = src2.reverse();
        var out = "";
        while (this.next()) {
          out += this.tok();
        }
        return out;
      };
      Parser.prototype.next = function() {
        this.token = this.tokens.pop();
        return this.token;
      };
      Parser.prototype.peek = function() {
        return this.tokens[this.tokens.length - 1] || 0;
      };
      Parser.prototype.parseText = function() {
        var body = this.token.text;
        while (this.peek().type === "text") {
          body += "\n" + this.next().text;
        }
        return this.inline.output(body);
      };
      Parser.prototype.tok = function() {
        switch (this.token.type) {
          case "space": {
            return "";
          }
          case "hr": {
            return this.renderer.hr();
          }
          case "heading": {
            return this.renderer.heading(this.inline.output(this.token.text), this.token.depth, unescape2(this.inlineText.output(this.token.text)), this.slugger);
          }
          case "code": {
            return this.renderer.code(this.token.text, this.token.lang, this.token.escaped);
          }
          case "table": {
            var header = "", body = "", i, row, cell, j;
            cell = "";
            for (i = 0; i < this.token.header.length; i++) {
              cell += this.renderer.tablecell(this.inline.output(this.token.header[i]), { header: true, align: this.token.align[i] });
            }
            header += this.renderer.tablerow(cell);
            for (i = 0; i < this.token.cells.length; i++) {
              row = this.token.cells[i];
              cell = "";
              for (j = 0; j < row.length; j++) {
                cell += this.renderer.tablecell(this.inline.output(row[j]), { header: false, align: this.token.align[j] });
              }
              body += this.renderer.tablerow(cell);
            }
            return this.renderer.table(header, body);
          }
          case "blockquote_start": {
            body = "";
            while (this.next().type !== "blockquote_end") {
              body += this.tok();
            }
            return this.renderer.blockquote(body);
          }
          case "list_start": {
            body = "";
            var ordered = this.token.ordered, start = this.token.start;
            while (this.next().type !== "list_end") {
              body += this.tok();
            }
            return this.renderer.list(body, ordered, start);
          }
          case "list_item_start": {
            body = "";
            var loose = this.token.loose;
            var checked = this.token.checked;
            var task = this.token.task;
            if (this.token.task) {
              body += this.renderer.checkbox(checked);
            }
            while (this.next().type !== "list_item_end") {
              body += !loose && this.token.type === "text" ? this.parseText() : this.tok();
            }
            return this.renderer.listitem(body, task, checked);
          }
          case "html": {
            return this.renderer.html(this.token.text);
          }
          case "paragraph": {
            return this.renderer.paragraph(this.inline.output(this.token.text));
          }
          case "text": {
            return this.renderer.paragraph(this.parseText());
          }
          default: {
            var errMsg = 'Token with "' + this.token.type + '" type was not found.';
            if (this.options.silent) {
              console.log(errMsg);
            } else {
              throw new Error(errMsg);
            }
          }
        }
      };
      function Slugger() {
        this.seen = {};
      }
      Slugger.prototype.slug = function(value) {
        var slug = value.toLowerCase().trim().replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g, "").replace(/\s/g, "-");
        if (this.seen.hasOwnProperty(slug)) {
          var originalSlug = slug;
          do {
            this.seen[originalSlug]++;
            slug = originalSlug + "-" + this.seen[originalSlug];
          } while (this.seen.hasOwnProperty(slug));
        }
        this.seen[slug] = 0;
        return slug;
      };
      function escape3(html, encode) {
        if (encode) {
          if (escape3.escapeTest.test(html)) {
            return html.replace(escape3.escapeReplace, function(ch) {
              return escape3.replacements[ch];
            });
          }
        } else {
          if (escape3.escapeTestNoEncode.test(html)) {
            return html.replace(escape3.escapeReplaceNoEncode, function(ch) {
              return escape3.replacements[ch];
            });
          }
        }
        return html;
      }
      escape3.escapeTest = /[&<>"']/;
      escape3.escapeReplace = /[&<>"']/g;
      escape3.replacements = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      };
      escape3.escapeTestNoEncode = /[<>"']|&(?!#?\w+;)/;
      escape3.escapeReplaceNoEncode = /[<>"']|&(?!#?\w+;)/g;
      function unescape2(html) {
        return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/ig, function(_, n) {
          n = n.toLowerCase();
          if (n === "colon")
            return ":";
          if (n.charAt(0) === "#") {
            return n.charAt(1) === "x" ? String.fromCharCode(parseInt(n.substring(2), 16)) : String.fromCharCode(+n.substring(1));
          }
          return "";
        });
      }
      function edit(regex, opt) {
        regex = regex.source || regex;
        opt = opt || "";
        return {
          replace: function(name, val) {
            val = val.source || val;
            val = val.replace(/(^|[^\[])\^/g, "$1");
            regex = regex.replace(name, val);
            return this;
          },
          getRegex: function() {
            return new RegExp(regex, opt);
          }
        };
      }
      function cleanUrl(sanitize, base, href) {
        if (sanitize) {
          try {
            var prot = decodeURIComponent(unescape2(href)).replace(/[^\w:]/g, "").toLowerCase();
          } catch (e) {
            return null;
          }
          if (prot.indexOf("javascript:") === 0 || prot.indexOf("vbscript:") === 0 || prot.indexOf("data:") === 0) {
            return null;
          }
        }
        if (base && !originIndependentUrl.test(href)) {
          href = resolveUrl(base, href);
        }
        try {
          href = encodeURI(href).replace(/%25/g, "%");
        } catch (e) {
          return null;
        }
        return href;
      }
      function resolveUrl(base, href) {
        if (!baseUrls[" " + base]) {
          if (/^[^:]+:\/*[^/]*$/.test(base)) {
            baseUrls[" " + base] = base + "/";
          } else {
            baseUrls[" " + base] = rtrim(base, "/", true);
          }
        }
        base = baseUrls[" " + base];
        if (href.slice(0, 2) === "//") {
          return base.replace(/:[\s\S]*/, ":") + href;
        } else if (href.charAt(0) === "/") {
          return base.replace(/(:\/*[^/]*)[\s\S]*/, "$1") + href;
        } else {
          return base + href;
        }
      }
      var baseUrls = {};
      var originIndependentUrl = /^$|^[a-z][a-z0-9+.-]*:|^[?#]/i;
      function noop2() {
      }
      noop2.exec = noop2;
      function merge(obj) {
        var i = 1, target, key;
        for (; i < arguments.length; i++) {
          target = arguments[i];
          for (key in target) {
            if (Object.prototype.hasOwnProperty.call(target, key)) {
              obj[key] = target[key];
            }
          }
        }
        return obj;
      }
      function splitCells(tableRow, count) {
        var row = tableRow.replace(/\|/g, function(match, offset, str) {
          var escaped3 = false, curr = offset;
          while (--curr >= 0 && str[curr] === "\\")
            escaped3 = !escaped3;
          if (escaped3) {
            return "|";
          } else {
            return " |";
          }
        }), cells = row.split(/ \|/), i = 0;
        if (cells.length > count) {
          cells.splice(count);
        } else {
          while (cells.length < count)
            cells.push("");
        }
        for (; i < cells.length; i++) {
          cells[i] = cells[i].trim().replace(/\\\|/g, "|");
        }
        return cells;
      }
      function rtrim(str, c, invert) {
        if (str.length === 0) {
          return "";
        }
        var suffLen = 0;
        while (suffLen < str.length) {
          var currChar = str.charAt(str.length - suffLen - 1);
          if (currChar === c && !invert) {
            suffLen++;
          } else if (currChar !== c && invert) {
            suffLen++;
          } else {
            break;
          }
        }
        return str.substr(0, str.length - suffLen);
      }
      function findClosingBracket(str, b) {
        if (str.indexOf(b[1]) === -1) {
          return -1;
        }
        var level = 0;
        for (var i = 0; i < str.length; i++) {
          if (str[i] === "\\") {
            i++;
          } else if (str[i] === b[0]) {
            level++;
          } else if (str[i] === b[1]) {
            level--;
            if (level < 0) {
              return i;
            }
          }
        }
        return -1;
      }
      function checkSanitizeDeprecation(opt) {
        if (opt && opt.sanitize && !opt.silent) {
          console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options");
        }
      }
      function marked2(src2, opt, callback) {
        if (typeof src2 === "undefined" || src2 === null) {
          throw new Error("marked(): input parameter is undefined or null");
        }
        if (typeof src2 !== "string") {
          throw new Error("marked(): input parameter is of type " + Object.prototype.toString.call(src2) + ", string expected");
        }
        if (callback || typeof opt === "function") {
          if (!callback) {
            callback = opt;
            opt = null;
          }
          opt = merge({}, marked2.defaults, opt || {});
          checkSanitizeDeprecation(opt);
          var highlight = opt.highlight, tokens, pending, i = 0;
          try {
            tokens = Lexer.lex(src2, opt);
          } catch (e) {
            return callback(e);
          }
          pending = tokens.length;
          var done = function(err) {
            if (err) {
              opt.highlight = highlight;
              return callback(err);
            }
            var out;
            try {
              out = Parser.parse(tokens, opt);
            } catch (e) {
              err = e;
            }
            opt.highlight = highlight;
            return err ? callback(err) : callback(null, out);
          };
          if (!highlight || highlight.length < 3) {
            return done();
          }
          delete opt.highlight;
          if (!pending)
            return done();
          for (; i < tokens.length; i++) {
            (function(token) {
              if (token.type !== "code") {
                return --pending || done();
              }
              return highlight(token.text, token.lang, function(err, code) {
                if (err)
                  return done(err);
                if (code == null || code === token.text) {
                  return --pending || done();
                }
                token.text = code;
                token.escaped = true;
                --pending || done();
              });
            })(tokens[i]);
          }
          return;
        }
        try {
          if (opt)
            opt = merge({}, marked2.defaults, opt);
          checkSanitizeDeprecation(opt);
          return Parser.parse(Lexer.lex(src2, opt), opt);
        } catch (e) {
          e.message += "\nPlease report this to https://github.com/markedjs/marked.";
          if ((opt || marked2.defaults).silent) {
            return "<p>An error occurred:</p><pre>" + escape3(e.message + "", true) + "</pre>";
          }
          throw e;
        }
      }
      marked2.options = marked2.setOptions = function(opt) {
        merge(marked2.defaults, opt);
        return marked2;
      };
      marked2.getDefaults = function() {
        return {
          baseUrl: null,
          breaks: false,
          gfm: true,
          headerIds: true,
          headerPrefix: "",
          highlight: null,
          langPrefix: "language-",
          mangle: true,
          pedantic: false,
          renderer: new Renderer(),
          sanitize: false,
          sanitizer: null,
          silent: false,
          smartLists: false,
          smartypants: false,
          xhtml: false
        };
      };
      marked2.defaults = marked2.getDefaults();
      marked2.Parser = Parser;
      marked2.parser = Parser.parse;
      marked2.Renderer = Renderer;
      marked2.TextRenderer = TextRenderer;
      marked2.Lexer = Lexer;
      marked2.lexer = Lexer.lex;
      marked2.InlineLexer = InlineLexer;
      marked2.inlineLexer = InlineLexer.output;
      marked2.Slugger = Slugger;
      marked2.parse = marked2;
      if (typeof module2 !== "undefined" && typeof exports2 === "object") {
        module2.exports = marked2;
      } else if (typeof define === "function" && define.amd) {
        define(function() {
          return marked2;
        });
      } else {
        root.marked = marked2;
      }
    })(exports2 || (typeof window !== "undefined" ? window : global));
  }
});

// node_modules/kind-of/index.js
var require_kind_of = __commonJS({
  "node_modules/kind-of/index.js"(exports2, module2) {
    init_shims();
    var toString = Object.prototype.toString;
    module2.exports = function kindOf(val) {
      if (val === void 0)
        return "undefined";
      if (val === null)
        return "null";
      var type = typeof val;
      if (type === "boolean")
        return "boolean";
      if (type === "string")
        return "string";
      if (type === "number")
        return "number";
      if (type === "symbol")
        return "symbol";
      if (type === "function") {
        return isGeneratorFn(val) ? "generatorfunction" : "function";
      }
      if (isArray(val))
        return "array";
      if (isBuffer(val))
        return "buffer";
      if (isArguments(val))
        return "arguments";
      if (isDate(val))
        return "date";
      if (isError(val))
        return "error";
      if (isRegexp(val))
        return "regexp";
      switch (ctorName(val)) {
        case "Symbol":
          return "symbol";
        case "Promise":
          return "promise";
        case "WeakMap":
          return "weakmap";
        case "WeakSet":
          return "weakset";
        case "Map":
          return "map";
        case "Set":
          return "set";
        case "Int8Array":
          return "int8array";
        case "Uint8Array":
          return "uint8array";
        case "Uint8ClampedArray":
          return "uint8clampedarray";
        case "Int16Array":
          return "int16array";
        case "Uint16Array":
          return "uint16array";
        case "Int32Array":
          return "int32array";
        case "Uint32Array":
          return "uint32array";
        case "Float32Array":
          return "float32array";
        case "Float64Array":
          return "float64array";
      }
      if (isGeneratorObj(val)) {
        return "generator";
      }
      type = toString.call(val);
      switch (type) {
        case "[object Object]":
          return "object";
        case "[object Map Iterator]":
          return "mapiterator";
        case "[object Set Iterator]":
          return "setiterator";
        case "[object String Iterator]":
          return "stringiterator";
        case "[object Array Iterator]":
          return "arrayiterator";
      }
      return type.slice(8, -1).toLowerCase().replace(/\s/g, "");
    };
    function ctorName(val) {
      return typeof val.constructor === "function" ? val.constructor.name : null;
    }
    function isArray(val) {
      if (Array.isArray)
        return Array.isArray(val);
      return val instanceof Array;
    }
    function isError(val) {
      return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
    }
    function isDate(val) {
      if (val instanceof Date)
        return true;
      return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
    }
    function isRegexp(val) {
      if (val instanceof RegExp)
        return true;
      return typeof val.flags === "string" && typeof val.ignoreCase === "boolean" && typeof val.multiline === "boolean" && typeof val.global === "boolean";
    }
    function isGeneratorFn(name, val) {
      return ctorName(name) === "GeneratorFunction";
    }
    function isGeneratorObj(val) {
      return typeof val.throw === "function" && typeof val.return === "function" && typeof val.next === "function";
    }
    function isArguments(val) {
      try {
        if (typeof val.length === "number" && typeof val.callee === "function") {
          return true;
        }
      } catch (err) {
        if (err.message.indexOf("callee") !== -1) {
          return true;
        }
      }
      return false;
    }
    function isBuffer(val) {
      if (val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// node_modules/is-extendable/index.js
var require_is_extendable = __commonJS({
  "node_modules/is-extendable/index.js"(exports2, module2) {
    init_shims();
    "use strict";
    module2.exports = function isExtendable(val) {
      return typeof val !== "undefined" && val !== null && (typeof val === "object" || typeof val === "function");
    };
  }
});

// node_modules/extend-shallow/index.js
var require_extend_shallow = __commonJS({
  "node_modules/extend-shallow/index.js"(exports2, module2) {
    init_shims();
    "use strict";
    var isObject = require_is_extendable();
    module2.exports = function extend(o) {
      if (!isObject(o)) {
        o = {};
      }
      var len = arguments.length;
      for (var i = 1; i < len; i++) {
        var obj = arguments[i];
        if (isObject(obj)) {
          assign(o, obj);
        }
      }
      return o;
    };
    function assign(a, b) {
      for (var key in b) {
        if (hasOwn(b, key)) {
          a[key] = b[key];
        }
      }
    }
    function hasOwn(obj, key) {
      return Object.prototype.hasOwnProperty.call(obj, key);
    }
  }
});

// node_modules/section-matter/index.js
var require_section_matter = __commonJS({
  "node_modules/section-matter/index.js"(exports2, module2) {
    init_shims();
    "use strict";
    var typeOf = require_kind_of();
    var extend = require_extend_shallow();
    module2.exports = function(input, options2) {
      if (typeof options2 === "function") {
        options2 = { parse: options2 };
      }
      var file = toObject(input);
      var defaults = { section_delimiter: "---", parse: identity };
      var opts = extend({}, defaults, options2);
      var delim = opts.section_delimiter;
      var lines = file.content.split(/\r?\n/);
      var sections = null;
      var section = createSection();
      var content = [];
      var stack = [];
      function initSections(val) {
        file.content = val;
        sections = [];
        content = [];
      }
      function closeSection(val) {
        if (stack.length) {
          section.key = getKey(stack[0], delim);
          section.content = val;
          opts.parse(section, sections);
          sections.push(section);
          section = createSection();
          content = [];
          stack = [];
        }
      }
      for (var i = 0; i < lines.length; i++) {
        var line = lines[i];
        var len = stack.length;
        var ln = line.trim();
        if (isDelimiter(ln, delim)) {
          if (ln.length === 3 && i !== 0) {
            if (len === 0 || len === 2) {
              content.push(line);
              continue;
            }
            stack.push(ln);
            section.data = content.join("\n");
            content = [];
            continue;
          }
          if (sections === null) {
            initSections(content.join("\n"));
          }
          if (len === 2) {
            closeSection(content.join("\n"));
          }
          stack.push(ln);
          continue;
        }
        content.push(line);
      }
      if (sections === null) {
        initSections(content.join("\n"));
      } else {
        closeSection(content.join("\n"));
      }
      file.sections = sections;
      return file;
    };
    function isDelimiter(line, delim) {
      if (line.slice(0, delim.length) !== delim) {
        return false;
      }
      if (line.charAt(delim.length + 1) === delim.slice(-1)) {
        return false;
      }
      return true;
    }
    function toObject(input) {
      if (typeOf(input) !== "object") {
        input = { content: input };
      }
      if (typeof input.content !== "string" && !isBuffer(input.content)) {
        throw new TypeError("expected a buffer or string");
      }
      input.content = input.content.toString();
      input.sections = [];
      return input;
    }
    function getKey(val, delim) {
      return val ? val.slice(delim.length).trim() : "";
    }
    function createSection() {
      return { key: "", data: "", content: "" };
    }
    function identity(val) {
      return val;
    }
    function isBuffer(val) {
      if (val && val.constructor && typeof val.constructor.isBuffer === "function") {
        return val.constructor.isBuffer(val);
      }
      return false;
    }
  }
});

// node_modules/js-yaml/lib/js-yaml/common.js
var require_common = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/common.js"(exports2, module2) {
    init_shims();
    "use strict";
    function isNothing(subject) {
      return typeof subject === "undefined" || subject === null;
    }
    function isObject(subject) {
      return typeof subject === "object" && subject !== null;
    }
    function toArray(sequence) {
      if (Array.isArray(sequence))
        return sequence;
      else if (isNothing(sequence))
        return [];
      return [sequence];
    }
    function extend(target, source) {
      var index2, length, key, sourceKeys;
      if (source) {
        sourceKeys = Object.keys(source);
        for (index2 = 0, length = sourceKeys.length; index2 < length; index2 += 1) {
          key = sourceKeys[index2];
          target[key] = source[key];
        }
      }
      return target;
    }
    function repeat(string, count) {
      var result = "", cycle;
      for (cycle = 0; cycle < count; cycle += 1) {
        result += string;
      }
      return result;
    }
    function isNegativeZero(number) {
      return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
    }
    module2.exports.isNothing = isNothing;
    module2.exports.isObject = isObject;
    module2.exports.toArray = toArray;
    module2.exports.repeat = repeat;
    module2.exports.isNegativeZero = isNegativeZero;
    module2.exports.extend = extend;
  }
});

// node_modules/js-yaml/lib/js-yaml/exception.js
var require_exception = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/exception.js"(exports2, module2) {
    init_shims();
    "use strict";
    function YAMLException(reason, mark) {
      Error.call(this);
      this.name = "YAMLException";
      this.reason = reason;
      this.mark = mark;
      this.message = (this.reason || "(unknown reason)") + (this.mark ? " " + this.mark.toString() : "");
      if (Error.captureStackTrace) {
        Error.captureStackTrace(this, this.constructor);
      } else {
        this.stack = new Error().stack || "";
      }
    }
    YAMLException.prototype = Object.create(Error.prototype);
    YAMLException.prototype.constructor = YAMLException;
    YAMLException.prototype.toString = function toString(compact) {
      var result = this.name + ": ";
      result += this.reason || "(unknown reason)";
      if (!compact && this.mark) {
        result += " " + this.mark.toString();
      }
      return result;
    };
    module2.exports = YAMLException;
  }
});

// node_modules/js-yaml/lib/js-yaml/mark.js
var require_mark = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/mark.js"(exports2, module2) {
    init_shims();
    "use strict";
    var common = require_common();
    function Mark(name, buffer, position, line, column) {
      this.name = name;
      this.buffer = buffer;
      this.position = position;
      this.line = line;
      this.column = column;
    }
    Mark.prototype.getSnippet = function getSnippet(indent, maxLength) {
      var head, start, tail, end, snippet;
      if (!this.buffer)
        return null;
      indent = indent || 4;
      maxLength = maxLength || 75;
      head = "";
      start = this.position;
      while (start > 0 && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
        start -= 1;
        if (this.position - start > maxLength / 2 - 1) {
          head = " ... ";
          start += 5;
          break;
        }
      }
      tail = "";
      end = this.position;
      while (end < this.buffer.length && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
        end += 1;
        if (end - this.position > maxLength / 2 - 1) {
          tail = " ... ";
          end -= 5;
          break;
        }
      }
      snippet = this.buffer.slice(start, end);
      return common.repeat(" ", indent) + head + snippet + tail + "\n" + common.repeat(" ", indent + this.position - start + head.length) + "^";
    };
    Mark.prototype.toString = function toString(compact) {
      var snippet, where = "";
      if (this.name) {
        where += 'in "' + this.name + '" ';
      }
      where += "at line " + (this.line + 1) + ", column " + (this.column + 1);
      if (!compact) {
        snippet = this.getSnippet();
        if (snippet) {
          where += ":\n" + snippet;
        }
      }
      return where;
    };
    module2.exports = Mark;
  }
});

// node_modules/js-yaml/lib/js-yaml/type.js
var require_type = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type.js"(exports2, module2) {
    init_shims();
    "use strict";
    var YAMLException = require_exception();
    var TYPE_CONSTRUCTOR_OPTIONS = [
      "kind",
      "resolve",
      "construct",
      "instanceOf",
      "predicate",
      "represent",
      "defaultStyle",
      "styleAliases"
    ];
    var YAML_NODE_KINDS = [
      "scalar",
      "sequence",
      "mapping"
    ];
    function compileStyleAliases(map) {
      var result = {};
      if (map !== null) {
        Object.keys(map).forEach(function(style) {
          map[style].forEach(function(alias) {
            result[String(alias)] = style;
          });
        });
      }
      return result;
    }
    function Type(tag, options2) {
      options2 = options2 || {};
      Object.keys(options2).forEach(function(name) {
        if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
          throw new YAMLException('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
        }
      });
      this.tag = tag;
      this.kind = options2["kind"] || null;
      this.resolve = options2["resolve"] || function() {
        return true;
      };
      this.construct = options2["construct"] || function(data) {
        return data;
      };
      this.instanceOf = options2["instanceOf"] || null;
      this.predicate = options2["predicate"] || null;
      this.represent = options2["represent"] || null;
      this.defaultStyle = options2["defaultStyle"] || null;
      this.styleAliases = compileStyleAliases(options2["styleAliases"] || null);
      if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
        throw new YAMLException('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
      }
    }
    module2.exports = Type;
  }
});

// node_modules/js-yaml/lib/js-yaml/schema.js
var require_schema = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema.js"(exports2, module2) {
    init_shims();
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Type = require_type();
    function compileList(schema, name, result) {
      var exclude = [];
      schema.include.forEach(function(includedSchema) {
        result = compileList(includedSchema, name, result);
      });
      schema[name].forEach(function(currentType) {
        result.forEach(function(previousType, previousIndex) {
          if (previousType.tag === currentType.tag && previousType.kind === currentType.kind) {
            exclude.push(previousIndex);
          }
        });
        result.push(currentType);
      });
      return result.filter(function(type, index2) {
        return exclude.indexOf(index2) === -1;
      });
    }
    function compileMap() {
      var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {}
      }, index2, length;
      function collectType(type) {
        result[type.kind][type.tag] = result["fallback"][type.tag] = type;
      }
      for (index2 = 0, length = arguments.length; index2 < length; index2 += 1) {
        arguments[index2].forEach(collectType);
      }
      return result;
    }
    function Schema(definition) {
      this.include = definition.include || [];
      this.implicit = definition.implicit || [];
      this.explicit = definition.explicit || [];
      this.implicit.forEach(function(type) {
        if (type.loadKind && type.loadKind !== "scalar") {
          throw new YAMLException("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
        }
      });
      this.compiledImplicit = compileList(this, "implicit", []);
      this.compiledExplicit = compileList(this, "explicit", []);
      this.compiledTypeMap = compileMap(this.compiledImplicit, this.compiledExplicit);
    }
    Schema.DEFAULT = null;
    Schema.create = function createSchema() {
      var schemas, types2;
      switch (arguments.length) {
        case 1:
          schemas = Schema.DEFAULT;
          types2 = arguments[0];
          break;
        case 2:
          schemas = arguments[0];
          types2 = arguments[1];
          break;
        default:
          throw new YAMLException("Wrong number of arguments for Schema.create function");
      }
      schemas = common.toArray(schemas);
      types2 = common.toArray(types2);
      if (!schemas.every(function(schema) {
        return schema instanceof Schema;
      })) {
        throw new YAMLException("Specified list of super schemas (or a single Schema object) contains a non-Schema object.");
      }
      if (!types2.every(function(type) {
        return type instanceof Type;
      })) {
        throw new YAMLException("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      return new Schema({
        include: schemas,
        explicit: types2
      });
    };
    module2.exports = Schema;
  }
});

// node_modules/js-yaml/lib/js-yaml/type/str.js
var require_str = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/str.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:str", {
      kind: "scalar",
      construct: function(data) {
        return data !== null ? data : "";
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/seq.js
var require_seq = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/seq.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:seq", {
      kind: "sequence",
      construct: function(data) {
        return data !== null ? data : [];
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/map.js
var require_map = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/map.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Type = require_type();
    module2.exports = new Type("tag:yaml.org,2002:map", {
      kind: "mapping",
      construct: function(data) {
        return data !== null ? data : {};
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/failsafe.js
var require_failsafe = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/failsafe.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      explicit: [
        require_str(),
        require_seq(),
        require_map()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/null.js
var require_null = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/null.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Type = require_type();
    function resolveYamlNull(data) {
      if (data === null)
        return true;
      var max = data.length;
      return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
    }
    function constructYamlNull() {
      return null;
    }
    function isNull(object) {
      return object === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:null", {
      kind: "scalar",
      resolve: resolveYamlNull,
      construct: constructYamlNull,
      predicate: isNull,
      represent: {
        canonical: function() {
          return "~";
        },
        lowercase: function() {
          return "null";
        },
        uppercase: function() {
          return "NULL";
        },
        camelcase: function() {
          return "Null";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/bool.js
var require_bool = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/bool.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Type = require_type();
    function resolveYamlBoolean(data) {
      if (data === null)
        return false;
      var max = data.length;
      return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
    }
    function constructYamlBoolean(data) {
      return data === "true" || data === "True" || data === "TRUE";
    }
    function isBoolean(object) {
      return Object.prototype.toString.call(object) === "[object Boolean]";
    }
    module2.exports = new Type("tag:yaml.org,2002:bool", {
      kind: "scalar",
      resolve: resolveYamlBoolean,
      construct: constructYamlBoolean,
      predicate: isBoolean,
      represent: {
        lowercase: function(object) {
          return object ? "true" : "false";
        },
        uppercase: function(object) {
          return object ? "TRUE" : "FALSE";
        },
        camelcase: function(object) {
          return object ? "True" : "False";
        }
      },
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/int.js
var require_int = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/int.js"(exports2, module2) {
    init_shims();
    "use strict";
    var common = require_common();
    var Type = require_type();
    function isHexCode(c) {
      return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
    }
    function isOctCode(c) {
      return 48 <= c && c <= 55;
    }
    function isDecCode(c) {
      return 48 <= c && c <= 57;
    }
    function resolveYamlInteger(data) {
      if (data === null)
        return false;
      var max = data.length, index2 = 0, hasDigits = false, ch;
      if (!max)
        return false;
      ch = data[index2];
      if (ch === "-" || ch === "+") {
        ch = data[++index2];
      }
      if (ch === "0") {
        if (index2 + 1 === max)
          return true;
        ch = data[++index2];
        if (ch === "b") {
          index2++;
          for (; index2 < max; index2++) {
            ch = data[index2];
            if (ch === "_")
              continue;
            if (ch !== "0" && ch !== "1")
              return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        if (ch === "x") {
          index2++;
          for (; index2 < max; index2++) {
            ch = data[index2];
            if (ch === "_")
              continue;
            if (!isHexCode(data.charCodeAt(index2)))
              return false;
            hasDigits = true;
          }
          return hasDigits && ch !== "_";
        }
        for (; index2 < max; index2++) {
          ch = data[index2];
          if (ch === "_")
            continue;
          if (!isOctCode(data.charCodeAt(index2)))
            return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "_")
        return false;
      for (; index2 < max; index2++) {
        ch = data[index2];
        if (ch === "_")
          continue;
        if (ch === ":")
          break;
        if (!isDecCode(data.charCodeAt(index2))) {
          return false;
        }
        hasDigits = true;
      }
      if (!hasDigits || ch === "_")
        return false;
      if (ch !== ":")
        return true;
      return /^(:[0-5]?[0-9])+$/.test(data.slice(index2));
    }
    function constructYamlInteger(data) {
      var value = data, sign = 1, ch, base, digits = [];
      if (value.indexOf("_") !== -1) {
        value = value.replace(/_/g, "");
      }
      ch = value[0];
      if (ch === "-" || ch === "+") {
        if (ch === "-")
          sign = -1;
        value = value.slice(1);
        ch = value[0];
      }
      if (value === "0")
        return 0;
      if (ch === "0") {
        if (value[1] === "b")
          return sign * parseInt(value.slice(2), 2);
        if (value[1] === "x")
          return sign * parseInt(value, 16);
        return sign * parseInt(value, 8);
      }
      if (value.indexOf(":") !== -1) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseInt(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d2) {
          value += d2 * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseInt(value, 10);
    }
    function isInteger(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:int", {
      kind: "scalar",
      resolve: resolveYamlInteger,
      construct: constructYamlInteger,
      predicate: isInteger,
      represent: {
        binary: function(obj) {
          return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
        },
        octal: function(obj) {
          return obj >= 0 ? "0" + obj.toString(8) : "-0" + obj.toString(8).slice(1);
        },
        decimal: function(obj) {
          return obj.toString(10);
        },
        hexadecimal: function(obj) {
          return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
        }
      },
      defaultStyle: "decimal",
      styleAliases: {
        binary: [2, "bin"],
        octal: [8, "oct"],
        decimal: [10, "dec"],
        hexadecimal: [16, "hex"]
      }
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/float.js
var require_float = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/float.js"(exports2, module2) {
    init_shims();
    "use strict";
    var common = require_common();
    var Type = require_type();
    var YAML_FLOAT_PATTERN = new RegExp("^(?:[-+]?(?:0|[1-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\\.[0-9_]*|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$");
    function resolveYamlFloat(data) {
      if (data === null)
        return false;
      if (!YAML_FLOAT_PATTERN.test(data) || data[data.length - 1] === "_") {
        return false;
      }
      return true;
    }
    function constructYamlFloat(data) {
      var value, sign, base, digits;
      value = data.replace(/_/g, "").toLowerCase();
      sign = value[0] === "-" ? -1 : 1;
      digits = [];
      if ("+-".indexOf(value[0]) >= 0) {
        value = value.slice(1);
      }
      if (value === ".inf") {
        return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
      } else if (value === ".nan") {
        return NaN;
      } else if (value.indexOf(":") >= 0) {
        value.split(":").forEach(function(v) {
          digits.unshift(parseFloat(v, 10));
        });
        value = 0;
        base = 1;
        digits.forEach(function(d2) {
          value += d2 * base;
          base *= 60;
        });
        return sign * value;
      }
      return sign * parseFloat(value, 10);
    }
    var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
    function representYamlFloat(object, style) {
      var res;
      if (isNaN(object)) {
        switch (style) {
          case "lowercase":
            return ".nan";
          case "uppercase":
            return ".NAN";
          case "camelcase":
            return ".NaN";
        }
      } else if (Number.POSITIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return ".inf";
          case "uppercase":
            return ".INF";
          case "camelcase":
            return ".Inf";
        }
      } else if (Number.NEGATIVE_INFINITY === object) {
        switch (style) {
          case "lowercase":
            return "-.inf";
          case "uppercase":
            return "-.INF";
          case "camelcase":
            return "-.Inf";
        }
      } else if (common.isNegativeZero(object)) {
        return "-0.0";
      }
      res = object.toString(10);
      return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
    }
    function isFloat(object) {
      return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
    }
    module2.exports = new Type("tag:yaml.org,2002:float", {
      kind: "scalar",
      resolve: resolveYamlFloat,
      construct: constructYamlFloat,
      predicate: isFloat,
      represent: representYamlFloat,
      defaultStyle: "lowercase"
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/json.js
var require_json = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/json.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_failsafe()
      ],
      implicit: [
        require_null(),
        require_bool(),
        require_int(),
        require_float()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/core.js
var require_core = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/core.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_json()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/timestamp.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Type = require_type();
    var YAML_DATE_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$");
    var YAML_TIMESTAMP_REGEXP = new RegExp("^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$");
    function resolveYamlTimestamp(data) {
      if (data === null)
        return false;
      if (YAML_DATE_REGEXP.exec(data) !== null)
        return true;
      if (YAML_TIMESTAMP_REGEXP.exec(data) !== null)
        return true;
      return false;
    }
    function constructYamlTimestamp(data) {
      var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
      match = YAML_DATE_REGEXP.exec(data);
      if (match === null)
        match = YAML_TIMESTAMP_REGEXP.exec(data);
      if (match === null)
        throw new Error("Date resolve error");
      year = +match[1];
      month = +match[2] - 1;
      day = +match[3];
      if (!match[4]) {
        return new Date(Date.UTC(year, month, day));
      }
      hour = +match[4];
      minute = +match[5];
      second = +match[6];
      if (match[7]) {
        fraction = match[7].slice(0, 3);
        while (fraction.length < 3) {
          fraction += "0";
        }
        fraction = +fraction;
      }
      if (match[9]) {
        tz_hour = +match[10];
        tz_minute = +(match[11] || 0);
        delta = (tz_hour * 60 + tz_minute) * 6e4;
        if (match[9] === "-")
          delta = -delta;
      }
      date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
      if (delta)
        date.setTime(date.getTime() - delta);
      return date;
    }
    function representYamlTimestamp(object) {
      return object.toISOString();
    }
    module2.exports = new Type("tag:yaml.org,2002:timestamp", {
      kind: "scalar",
      resolve: resolveYamlTimestamp,
      construct: constructYamlTimestamp,
      instanceOf: Date,
      represent: representYamlTimestamp
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/merge.js
var require_merge = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/merge.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Type = require_type();
    function resolveYamlMerge(data) {
      return data === "<<" || data === null;
    }
    module2.exports = new Type("tag:yaml.org,2002:merge", {
      kind: "scalar",
      resolve: resolveYamlMerge
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/binary.js
var require_binary = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/binary.js"(exports2, module2) {
    init_shims();
    "use strict";
    var NodeBuffer;
    try {
      _require = require;
      NodeBuffer = _require("buffer").Buffer;
    } catch (__) {
    }
    var _require;
    var Type = require_type();
    var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
    function resolveYamlBinary(data) {
      if (data === null)
        return false;
      var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        code = map.indexOf(data.charAt(idx));
        if (code > 64)
          continue;
        if (code < 0)
          return false;
        bitlen += 6;
      }
      return bitlen % 8 === 0;
    }
    function constructYamlBinary(data) {
      var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map = BASE64_MAP, bits = 0, result = [];
      for (idx = 0; idx < max; idx++) {
        if (idx % 4 === 0 && idx) {
          result.push(bits >> 16 & 255);
          result.push(bits >> 8 & 255);
          result.push(bits & 255);
        }
        bits = bits << 6 | map.indexOf(input.charAt(idx));
      }
      tailbits = max % 4 * 6;
      if (tailbits === 0) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      } else if (tailbits === 18) {
        result.push(bits >> 10 & 255);
        result.push(bits >> 2 & 255);
      } else if (tailbits === 12) {
        result.push(bits >> 4 & 255);
      }
      if (NodeBuffer) {
        return NodeBuffer.from ? NodeBuffer.from(result) : new NodeBuffer(result);
      }
      return result;
    }
    function representYamlBinary(object) {
      var result = "", bits = 0, idx, tail, max = object.length, map = BASE64_MAP;
      for (idx = 0; idx < max; idx++) {
        if (idx % 3 === 0 && idx) {
          result += map[bits >> 18 & 63];
          result += map[bits >> 12 & 63];
          result += map[bits >> 6 & 63];
          result += map[bits & 63];
        }
        bits = (bits << 8) + object[idx];
      }
      tail = max % 3;
      if (tail === 0) {
        result += map[bits >> 18 & 63];
        result += map[bits >> 12 & 63];
        result += map[bits >> 6 & 63];
        result += map[bits & 63];
      } else if (tail === 2) {
        result += map[bits >> 10 & 63];
        result += map[bits >> 4 & 63];
        result += map[bits << 2 & 63];
        result += map[64];
      } else if (tail === 1) {
        result += map[bits >> 2 & 63];
        result += map[bits << 4 & 63];
        result += map[64];
        result += map[64];
      }
      return result;
    }
    function isBinary(object) {
      return NodeBuffer && NodeBuffer.isBuffer(object);
    }
    module2.exports = new Type("tag:yaml.org,2002:binary", {
      kind: "scalar",
      resolve: resolveYamlBinary,
      construct: constructYamlBinary,
      predicate: isBinary,
      represent: representYamlBinary
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/omap.js
var require_omap = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/omap.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var _toString = Object.prototype.toString;
    function resolveYamlOmap(data) {
      if (data === null)
        return true;
      var objectKeys = [], index2, length, pair, pairKey, pairHasKey, object = data;
      for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
        pair = object[index2];
        pairHasKey = false;
        if (_toString.call(pair) !== "[object Object]")
          return false;
        for (pairKey in pair) {
          if (_hasOwnProperty.call(pair, pairKey)) {
            if (!pairHasKey)
              pairHasKey = true;
            else
              return false;
          }
        }
        if (!pairHasKey)
          return false;
        if (objectKeys.indexOf(pairKey) === -1)
          objectKeys.push(pairKey);
        else
          return false;
      }
      return true;
    }
    function constructYamlOmap(data) {
      return data !== null ? data : [];
    }
    module2.exports = new Type("tag:yaml.org,2002:omap", {
      kind: "sequence",
      resolve: resolveYamlOmap,
      construct: constructYamlOmap
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/pairs.js
var require_pairs = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/pairs.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Type = require_type();
    var _toString = Object.prototype.toString;
    function resolveYamlPairs(data) {
      if (data === null)
        return true;
      var index2, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
        pair = object[index2];
        if (_toString.call(pair) !== "[object Object]")
          return false;
        keys = Object.keys(pair);
        if (keys.length !== 1)
          return false;
        result[index2] = [keys[0], pair[keys[0]]];
      }
      return true;
    }
    function constructYamlPairs(data) {
      if (data === null)
        return [];
      var index2, length, pair, keys, result, object = data;
      result = new Array(object.length);
      for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
        pair = object[index2];
        keys = Object.keys(pair);
        result[index2] = [keys[0], pair[keys[0]]];
      }
      return result;
    }
    module2.exports = new Type("tag:yaml.org,2002:pairs", {
      kind: "sequence",
      resolve: resolveYamlPairs,
      construct: constructYamlPairs
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/set.js
var require_set = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/set.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Type = require_type();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    function resolveYamlSet(data) {
      if (data === null)
        return true;
      var key, object = data;
      for (key in object) {
        if (_hasOwnProperty.call(object, key)) {
          if (object[key] !== null)
            return false;
        }
      }
      return true;
    }
    function constructYamlSet(data) {
      return data !== null ? data : {};
    }
    module2.exports = new Type("tag:yaml.org,2002:set", {
      kind: "mapping",
      resolve: resolveYamlSet,
      construct: constructYamlSet
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/default_safe.js
var require_default_safe = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/default_safe.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Schema = require_schema();
    module2.exports = new Schema({
      include: [
        require_core()
      ],
      implicit: [
        require_timestamp(),
        require_merge()
      ],
      explicit: [
        require_binary(),
        require_omap(),
        require_pairs(),
        require_set()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/undefined.js
var require_undefined = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/undefined.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Type = require_type();
    function resolveJavascriptUndefined() {
      return true;
    }
    function constructJavascriptUndefined() {
      return void 0;
    }
    function representJavascriptUndefined() {
      return "";
    }
    function isUndefined(object) {
      return typeof object === "undefined";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/undefined", {
      kind: "scalar",
      resolve: resolveJavascriptUndefined,
      construct: constructJavascriptUndefined,
      predicate: isUndefined,
      represent: representJavascriptUndefined
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/regexp.js
var require_regexp = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/regexp.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Type = require_type();
    function resolveJavascriptRegExp(data) {
      if (data === null)
        return false;
      if (data.length === 0)
        return false;
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail)
          modifiers = tail[1];
        if (modifiers.length > 3)
          return false;
        if (regexp[regexp.length - modifiers.length - 1] !== "/")
          return false;
      }
      return true;
    }
    function constructJavascriptRegExp(data) {
      var regexp = data, tail = /\/([gim]*)$/.exec(data), modifiers = "";
      if (regexp[0] === "/") {
        if (tail)
          modifiers = tail[1];
        regexp = regexp.slice(1, regexp.length - modifiers.length - 1);
      }
      return new RegExp(regexp, modifiers);
    }
    function representJavascriptRegExp(object) {
      var result = "/" + object.source + "/";
      if (object.global)
        result += "g";
      if (object.multiline)
        result += "m";
      if (object.ignoreCase)
        result += "i";
      return result;
    }
    function isRegExp(object) {
      return Object.prototype.toString.call(object) === "[object RegExp]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/regexp", {
      kind: "scalar",
      resolve: resolveJavascriptRegExp,
      construct: constructJavascriptRegExp,
      predicate: isRegExp,
      represent: representJavascriptRegExp
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/type/js/function.js
var require_function = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/type/js/function.js"(exports2, module2) {
    init_shims();
    "use strict";
    var esprima;
    try {
      _require = require;
      esprima = _require("esprima");
    } catch (_) {
      if (typeof window !== "undefined")
        esprima = window.esprima;
    }
    var _require;
    var Type = require_type();
    function resolveJavascriptFunction(data) {
      if (data === null)
        return false;
      try {
        var source = "(" + data + ")", ast = esprima.parse(source, { range: true });
        if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
          return false;
        }
        return true;
      } catch (err) {
        return false;
      }
    }
    function constructJavascriptFunction(data) {
      var source = "(" + data + ")", ast = esprima.parse(source, { range: true }), params = [], body;
      if (ast.type !== "Program" || ast.body.length !== 1 || ast.body[0].type !== "ExpressionStatement" || ast.body[0].expression.type !== "ArrowFunctionExpression" && ast.body[0].expression.type !== "FunctionExpression") {
        throw new Error("Failed to resolve function");
      }
      ast.body[0].expression.params.forEach(function(param) {
        params.push(param.name);
      });
      body = ast.body[0].expression.body.range;
      if (ast.body[0].expression.body.type === "BlockStatement") {
        return new Function(params, source.slice(body[0] + 1, body[1] - 1));
      }
      return new Function(params, "return " + source.slice(body[0], body[1]));
    }
    function representJavascriptFunction(object) {
      return object.toString();
    }
    function isFunction(object) {
      return Object.prototype.toString.call(object) === "[object Function]";
    }
    module2.exports = new Type("tag:yaml.org,2002:js/function", {
      kind: "scalar",
      resolve: resolveJavascriptFunction,
      construct: constructJavascriptFunction,
      predicate: isFunction,
      represent: representJavascriptFunction
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/schema/default_full.js
var require_default_full = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/schema/default_full.js"(exports2, module2) {
    init_shims();
    "use strict";
    var Schema = require_schema();
    module2.exports = Schema.DEFAULT = new Schema({
      include: [
        require_default_safe()
      ],
      explicit: [
        require_undefined(),
        require_regexp(),
        require_function()
      ]
    });
  }
});

// node_modules/js-yaml/lib/js-yaml/loader.js
var require_loader = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/loader.js"(exports2, module2) {
    init_shims();
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var Mark = require_mark();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CONTEXT_FLOW_IN = 1;
    var CONTEXT_FLOW_OUT = 2;
    var CONTEXT_BLOCK_IN = 3;
    var CONTEXT_BLOCK_OUT = 4;
    var CHOMPING_CLIP = 1;
    var CHOMPING_STRIP = 2;
    var CHOMPING_KEEP = 3;
    var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
    var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
    var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
    var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
    var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
    function _class(obj) {
      return Object.prototype.toString.call(obj);
    }
    function is_EOL(c) {
      return c === 10 || c === 13;
    }
    function is_WHITE_SPACE(c) {
      return c === 9 || c === 32;
    }
    function is_WS_OR_EOL(c) {
      return c === 9 || c === 32 || c === 10 || c === 13;
    }
    function is_FLOW_INDICATOR(c) {
      return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
    }
    function fromHexCode(c) {
      var lc;
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      lc = c | 32;
      if (97 <= lc && lc <= 102) {
        return lc - 97 + 10;
      }
      return -1;
    }
    function escapedHexLen(c) {
      if (c === 120) {
        return 2;
      }
      if (c === 117) {
        return 4;
      }
      if (c === 85) {
        return 8;
      }
      return 0;
    }
    function fromDecimalCode(c) {
      if (48 <= c && c <= 57) {
        return c - 48;
      }
      return -1;
    }
    function simpleEscapeSequence(c) {
      return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
    }
    function charFromCodepoint(c) {
      if (c <= 65535) {
        return String.fromCharCode(c);
      }
      return String.fromCharCode((c - 65536 >> 10) + 55296, (c - 65536 & 1023) + 56320);
    }
    var simpleEscapeCheck = new Array(256);
    var simpleEscapeMap = new Array(256);
    for (var i = 0; i < 256; i++) {
      simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
      simpleEscapeMap[i] = simpleEscapeSequence(i);
    }
    function State(input, options2) {
      this.input = input;
      this.filename = options2["filename"] || null;
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.onWarning = options2["onWarning"] || null;
      this.legacy = options2["legacy"] || false;
      this.json = options2["json"] || false;
      this.listener = options2["listener"] || null;
      this.implicitTypes = this.schema.compiledImplicit;
      this.typeMap = this.schema.compiledTypeMap;
      this.length = input.length;
      this.position = 0;
      this.line = 0;
      this.lineStart = 0;
      this.lineIndent = 0;
      this.documents = [];
    }
    function generateError(state, message) {
      return new YAMLException(message, new Mark(state.filename, state.input, state.position, state.line, state.position - state.lineStart));
    }
    function throwError(state, message) {
      throw generateError(state, message);
    }
    function throwWarning(state, message) {
      if (state.onWarning) {
        state.onWarning.call(null, generateError(state, message));
      }
    }
    var directiveHandlers = {
      YAML: function handleYamlDirective(state, name, args) {
        var match, major, minor;
        if (state.version !== null) {
          throwError(state, "duplication of %YAML directive");
        }
        if (args.length !== 1) {
          throwError(state, "YAML directive accepts exactly one argument");
        }
        match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
        if (match === null) {
          throwError(state, "ill-formed argument of the YAML directive");
        }
        major = parseInt(match[1], 10);
        minor = parseInt(match[2], 10);
        if (major !== 1) {
          throwError(state, "unacceptable YAML version of the document");
        }
        state.version = args[0];
        state.checkLineBreaks = minor < 2;
        if (minor !== 1 && minor !== 2) {
          throwWarning(state, "unsupported YAML version of the document");
        }
      },
      TAG: function handleTagDirective(state, name, args) {
        var handle, prefix;
        if (args.length !== 2) {
          throwError(state, "TAG directive accepts exactly two arguments");
        }
        handle = args[0];
        prefix = args[1];
        if (!PATTERN_TAG_HANDLE.test(handle)) {
          throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
        }
        if (_hasOwnProperty.call(state.tagMap, handle)) {
          throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
        }
        if (!PATTERN_TAG_URI.test(prefix)) {
          throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
        }
        state.tagMap[handle] = prefix;
      }
    };
    function captureSegment(state, start, end, checkJson) {
      var _position, _length, _character, _result;
      if (start < end) {
        _result = state.input.slice(start, end);
        if (checkJson) {
          for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
            _character = _result.charCodeAt(_position);
            if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
              throwError(state, "expected valid JSON character");
            }
          }
        } else if (PATTERN_NON_PRINTABLE.test(_result)) {
          throwError(state, "the stream contains non-printable characters");
        }
        state.result += _result;
      }
    }
    function mergeMappings(state, destination, source, overridableKeys) {
      var sourceKeys, key, index2, quantity;
      if (!common.isObject(source)) {
        throwError(state, "cannot merge mappings; the provided source object is unacceptable");
      }
      sourceKeys = Object.keys(source);
      for (index2 = 0, quantity = sourceKeys.length; index2 < quantity; index2 += 1) {
        key = sourceKeys[index2];
        if (!_hasOwnProperty.call(destination, key)) {
          destination[key] = source[key];
          overridableKeys[key] = true;
        }
      }
    }
    function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startPos) {
      var index2, quantity;
      if (Array.isArray(keyNode)) {
        keyNode = Array.prototype.slice.call(keyNode);
        for (index2 = 0, quantity = keyNode.length; index2 < quantity; index2 += 1) {
          if (Array.isArray(keyNode[index2])) {
            throwError(state, "nested arrays are not supported inside keys");
          }
          if (typeof keyNode === "object" && _class(keyNode[index2]) === "[object Object]") {
            keyNode[index2] = "[object Object]";
          }
        }
      }
      if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
        keyNode = "[object Object]";
      }
      keyNode = String(keyNode);
      if (_result === null) {
        _result = {};
      }
      if (keyTag === "tag:yaml.org,2002:merge") {
        if (Array.isArray(valueNode)) {
          for (index2 = 0, quantity = valueNode.length; index2 < quantity; index2 += 1) {
            mergeMappings(state, _result, valueNode[index2], overridableKeys);
          }
        } else {
          mergeMappings(state, _result, valueNode, overridableKeys);
        }
      } else {
        if (!state.json && !_hasOwnProperty.call(overridableKeys, keyNode) && _hasOwnProperty.call(_result, keyNode)) {
          state.line = startLine || state.line;
          state.position = startPos || state.position;
          throwError(state, "duplicated mapping key");
        }
        _result[keyNode] = valueNode;
        delete overridableKeys[keyNode];
      }
      return _result;
    }
    function readLineBreak(state) {
      var ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 10) {
        state.position++;
      } else if (ch === 13) {
        state.position++;
        if (state.input.charCodeAt(state.position) === 10) {
          state.position++;
        }
      } else {
        throwError(state, "a line break is expected");
      }
      state.line += 1;
      state.lineStart = state.position;
    }
    function skipSeparationSpace(state, allowComments, checkIndent) {
      var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (allowComments && ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 10 && ch !== 13 && ch !== 0);
        }
        if (is_EOL(ch)) {
          readLineBreak(state);
          ch = state.input.charCodeAt(state.position);
          lineBreaks++;
          state.lineIndent = 0;
          while (ch === 32) {
            state.lineIndent++;
            ch = state.input.charCodeAt(++state.position);
          }
        } else {
          break;
        }
      }
      if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
        throwWarning(state, "deficient indentation");
      }
      return lineBreaks;
    }
    function testDocumentSeparator(state) {
      var _position = state.position, ch;
      ch = state.input.charCodeAt(_position);
      if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
        _position += 3;
        ch = state.input.charCodeAt(_position);
        if (ch === 0 || is_WS_OR_EOL(ch)) {
          return true;
        }
      }
      return false;
    }
    function writeFoldedLines(state, count) {
      if (count === 1) {
        state.result += " ";
      } else if (count > 1) {
        state.result += common.repeat("\n", count - 1);
      }
    }
    function readPlainScalar(state, nodeIndent, withinFlowCollection) {
      var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
      ch = state.input.charCodeAt(state.position);
      if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
        return false;
      }
      if (ch === 63 || ch === 45) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          return false;
        }
      }
      state.kind = "scalar";
      state.result = "";
      captureStart = captureEnd = state.position;
      hasPendingContent = false;
      while (ch !== 0) {
        if (ch === 58) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
            break;
          }
        } else if (ch === 35) {
          preceding = state.input.charCodeAt(state.position - 1);
          if (is_WS_OR_EOL(preceding)) {
            break;
          }
        } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
          break;
        } else if (is_EOL(ch)) {
          _line = state.line;
          _lineStart = state.lineStart;
          _lineIndent = state.lineIndent;
          skipSeparationSpace(state, false, -1);
          if (state.lineIndent >= nodeIndent) {
            hasPendingContent = true;
            ch = state.input.charCodeAt(state.position);
            continue;
          } else {
            state.position = captureEnd;
            state.line = _line;
            state.lineStart = _lineStart;
            state.lineIndent = _lineIndent;
            break;
          }
        }
        if (hasPendingContent) {
          captureSegment(state, captureStart, captureEnd, false);
          writeFoldedLines(state, state.line - _line);
          captureStart = captureEnd = state.position;
          hasPendingContent = false;
        }
        if (!is_WHITE_SPACE(ch)) {
          captureEnd = state.position + 1;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, captureEnd, false);
      if (state.result) {
        return true;
      }
      state.kind = _kind;
      state.result = _result;
      return false;
    }
    function readSingleQuotedScalar(state, nodeIndent) {
      var ch, captureStart, captureEnd;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 39) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 39) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (ch === 39) {
            captureStart = state.position;
            state.position++;
            captureEnd = state.position;
          } else {
            return true;
          }
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a single quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a single quoted scalar");
    }
    function readDoubleQuotedScalar(state, nodeIndent) {
      var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 34) {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      state.position++;
      captureStart = captureEnd = state.position;
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        if (ch === 34) {
          captureSegment(state, captureStart, state.position, true);
          state.position++;
          return true;
        } else if (ch === 92) {
          captureSegment(state, captureStart, state.position, true);
          ch = state.input.charCodeAt(++state.position);
          if (is_EOL(ch)) {
            skipSeparationSpace(state, false, nodeIndent);
          } else if (ch < 256 && simpleEscapeCheck[ch]) {
            state.result += simpleEscapeMap[ch];
            state.position++;
          } else if ((tmp = escapedHexLen(ch)) > 0) {
            hexLength = tmp;
            hexResult = 0;
            for (; hexLength > 0; hexLength--) {
              ch = state.input.charCodeAt(++state.position);
              if ((tmp = fromHexCode(ch)) >= 0) {
                hexResult = (hexResult << 4) + tmp;
              } else {
                throwError(state, "expected hexadecimal character");
              }
            }
            state.result += charFromCodepoint(hexResult);
            state.position++;
          } else {
            throwError(state, "unknown escape sequence");
          }
          captureStart = captureEnd = state.position;
        } else if (is_EOL(ch)) {
          captureSegment(state, captureStart, captureEnd, true);
          writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
          captureStart = captureEnd = state.position;
        } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
          throwError(state, "unexpected end of the document within a double quoted scalar");
        } else {
          state.position++;
          captureEnd = state.position;
        }
      }
      throwError(state, "unexpected end of the stream within a double quoted scalar");
    }
    function readFlowCollection(state, nodeIndent) {
      var readNext = true, _line, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = {}, keyNode, keyTag, valueNode, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 91) {
        terminator = 93;
        isMapping = false;
        _result = [];
      } else if (ch === 123) {
        terminator = 125;
        isMapping = true;
        _result = {};
      } else {
        return false;
      }
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(++state.position);
      while (ch !== 0) {
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === terminator) {
          state.position++;
          state.tag = _tag;
          state.anchor = _anchor;
          state.kind = isMapping ? "mapping" : "sequence";
          state.result = _result;
          return true;
        } else if (!readNext) {
          throwError(state, "missed comma between flow collection entries");
        }
        keyTag = keyNode = valueNode = null;
        isPair = isExplicitPair = false;
        if (ch === 63) {
          following = state.input.charCodeAt(state.position + 1);
          if (is_WS_OR_EOL(following)) {
            isPair = isExplicitPair = true;
            state.position++;
            skipSeparationSpace(state, true, nodeIndent);
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        keyTag = state.tag;
        keyNode = state.result;
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if ((isExplicitPair || state.line === _line) && ch === 58) {
          isPair = true;
          ch = state.input.charCodeAt(++state.position);
          skipSeparationSpace(state, true, nodeIndent);
          composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
          valueNode = state.result;
        }
        if (isMapping) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode);
        } else if (isPair) {
          _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode));
        } else {
          _result.push(keyNode);
        }
        skipSeparationSpace(state, true, nodeIndent);
        ch = state.input.charCodeAt(state.position);
        if (ch === 44) {
          readNext = true;
          ch = state.input.charCodeAt(++state.position);
        } else {
          readNext = false;
        }
      }
      throwError(state, "unexpected end of the stream within a flow collection");
    }
    function readBlockScalar(state, nodeIndent) {
      var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch === 124) {
        folding = false;
      } else if (ch === 62) {
        folding = true;
      } else {
        return false;
      }
      state.kind = "scalar";
      state.result = "";
      while (ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
        if (ch === 43 || ch === 45) {
          if (CHOMPING_CLIP === chomping) {
            chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
          } else {
            throwError(state, "repeat of a chomping mode identifier");
          }
        } else if ((tmp = fromDecimalCode(ch)) >= 0) {
          if (tmp === 0) {
            throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
          } else if (!detectedIndent) {
            textIndent = nodeIndent + tmp - 1;
            detectedIndent = true;
          } else {
            throwError(state, "repeat of an indentation width identifier");
          }
        } else {
          break;
        }
      }
      if (is_WHITE_SPACE(ch)) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (is_WHITE_SPACE(ch));
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (!is_EOL(ch) && ch !== 0);
        }
      }
      while (ch !== 0) {
        readLineBreak(state);
        state.lineIndent = 0;
        ch = state.input.charCodeAt(state.position);
        while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
        if (!detectedIndent && state.lineIndent > textIndent) {
          textIndent = state.lineIndent;
        }
        if (is_EOL(ch)) {
          emptyLines++;
          continue;
        }
        if (state.lineIndent < textIndent) {
          if (chomping === CHOMPING_KEEP) {
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (chomping === CHOMPING_CLIP) {
            if (didReadContent) {
              state.result += "\n";
            }
          }
          break;
        }
        if (folding) {
          if (is_WHITE_SPACE(ch)) {
            atMoreIndented = true;
            state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
          } else if (atMoreIndented) {
            atMoreIndented = false;
            state.result += common.repeat("\n", emptyLines + 1);
          } else if (emptyLines === 0) {
            if (didReadContent) {
              state.result += " ";
            }
          } else {
            state.result += common.repeat("\n", emptyLines);
          }
        } else {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        }
        didReadContent = true;
        detectedIndent = true;
        emptyLines = 0;
        captureStart = state.position;
        while (!is_EOL(ch) && ch !== 0) {
          ch = state.input.charCodeAt(++state.position);
        }
        captureSegment(state, captureStart, state.position, false);
      }
      return true;
    }
    function readBlockSequence(state, nodeIndent) {
      var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        if (ch !== 45) {
          break;
        }
        following = state.input.charCodeAt(state.position + 1);
        if (!is_WS_OR_EOL(following)) {
          break;
        }
        detected = true;
        state.position++;
        if (skipSeparationSpace(state, true, -1)) {
          if (state.lineIndent <= nodeIndent) {
            _result.push(null);
            ch = state.input.charCodeAt(state.position);
            continue;
          }
        }
        _line = state.line;
        composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
        _result.push(state.result);
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
          throwError(state, "bad indentation of a sequence entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "sequence";
        state.result = _result;
        return true;
      }
      return false;
    }
    function readBlockMapping(state, nodeIndent, flowIndent) {
      var following, allowCompact, _line, _pos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = {}, keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = _result;
      }
      ch = state.input.charCodeAt(state.position);
      while (ch !== 0) {
        following = state.input.charCodeAt(state.position + 1);
        _line = state.line;
        _pos = state.position;
        if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
          if (ch === 63) {
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = true;
            allowCompact = true;
          } else if (atExplicitKey) {
            atExplicitKey = false;
            allowCompact = true;
          } else {
            throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
          }
          state.position += 1;
          ch = following;
        } else if (composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          if (state.line === _line) {
            ch = state.input.charCodeAt(state.position);
            while (is_WHITE_SPACE(ch)) {
              ch = state.input.charCodeAt(++state.position);
            }
            if (ch === 58) {
              ch = state.input.charCodeAt(++state.position);
              if (!is_WS_OR_EOL(ch)) {
                throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
              }
              if (atExplicitKey) {
                storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
                keyTag = keyNode = valueNode = null;
              }
              detected = true;
              atExplicitKey = false;
              allowCompact = false;
              keyTag = state.tag;
              keyNode = state.result;
            } else if (detected) {
              throwError(state, "can not read an implicit mapping pair; a colon is missed");
            } else {
              state.tag = _tag;
              state.anchor = _anchor;
              return true;
            }
          } else if (detected) {
            throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        } else {
          break;
        }
        if (state.line === _line || state.lineIndent > nodeIndent) {
          if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
            if (atExplicitKey) {
              keyNode = state.result;
            } else {
              valueNode = state.result;
            }
          }
          if (!atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _pos);
            keyTag = keyNode = valueNode = null;
          }
          skipSeparationSpace(state, true, -1);
          ch = state.input.charCodeAt(state.position);
        }
        if (state.lineIndent > nodeIndent && ch !== 0) {
          throwError(state, "bad indentation of a mapping entry");
        } else if (state.lineIndent < nodeIndent) {
          break;
        }
      }
      if (atExplicitKey) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null);
      }
      if (detected) {
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = "mapping";
        state.result = _result;
      }
      return detected;
    }
    function readTagProperty(state) {
      var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 33)
        return false;
      if (state.tag !== null) {
        throwError(state, "duplication of a tag property");
      }
      ch = state.input.charCodeAt(++state.position);
      if (ch === 60) {
        isVerbatim = true;
        ch = state.input.charCodeAt(++state.position);
      } else if (ch === 33) {
        isNamed = true;
        tagHandle = "!!";
        ch = state.input.charCodeAt(++state.position);
      } else {
        tagHandle = "!";
      }
      _position = state.position;
      if (isVerbatim) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0 && ch !== 62);
        if (state.position < state.length) {
          tagName = state.input.slice(_position, state.position);
          ch = state.input.charCodeAt(++state.position);
        } else {
          throwError(state, "unexpected end of the stream within a verbatim tag");
        }
      } else {
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          if (ch === 33) {
            if (!isNamed) {
              tagHandle = state.input.slice(_position - 1, state.position + 1);
              if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
                throwError(state, "named tag handle cannot contain such characters");
              }
              isNamed = true;
              _position = state.position + 1;
            } else {
              throwError(state, "tag suffix cannot contain exclamation marks");
            }
          }
          ch = state.input.charCodeAt(++state.position);
        }
        tagName = state.input.slice(_position, state.position);
        if (PATTERN_FLOW_INDICATORS.test(tagName)) {
          throwError(state, "tag suffix cannot contain flow indicator characters");
        }
      }
      if (tagName && !PATTERN_TAG_URI.test(tagName)) {
        throwError(state, "tag name cannot contain such characters: " + tagName);
      }
      if (isVerbatim) {
        state.tag = tagName;
      } else if (_hasOwnProperty.call(state.tagMap, tagHandle)) {
        state.tag = state.tagMap[tagHandle] + tagName;
      } else if (tagHandle === "!") {
        state.tag = "!" + tagName;
      } else if (tagHandle === "!!") {
        state.tag = "tag:yaml.org,2002:" + tagName;
      } else {
        throwError(state, 'undeclared tag handle "' + tagHandle + '"');
      }
      return true;
    }
    function readAnchorProperty(state) {
      var _position, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 38)
        return false;
      if (state.anchor !== null) {
        throwError(state, "duplication of an anchor property");
      }
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an anchor node must contain at least one character");
      }
      state.anchor = state.input.slice(_position, state.position);
      return true;
    }
    function readAlias(state) {
      var _position, alias, ch;
      ch = state.input.charCodeAt(state.position);
      if (ch !== 42)
        return false;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      if (state.position === _position) {
        throwError(state, "name of an alias node must contain at least one character");
      }
      alias = state.input.slice(_position, state.position);
      if (!_hasOwnProperty.call(state.anchorMap, alias)) {
        throwError(state, 'unidentified alias "' + alias + '"');
      }
      state.result = state.anchorMap[alias];
      skipSeparationSpace(state, true, -1);
      return true;
    }
    function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
      var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, type, flowIndent, blockIndent;
      if (state.listener !== null) {
        state.listener("open", state);
      }
      state.tag = null;
      state.anchor = null;
      state.kind = null;
      state.result = null;
      allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
      if (allowToSeek) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        }
      }
      if (indentStatus === 1) {
        while (readTagProperty(state) || readAnchorProperty(state)) {
          if (skipSeparationSpace(state, true, -1)) {
            atNewLine = true;
            allowBlockCollections = allowBlockStyles;
            if (state.lineIndent > parentIndent) {
              indentStatus = 1;
            } else if (state.lineIndent === parentIndent) {
              indentStatus = 0;
            } else if (state.lineIndent < parentIndent) {
              indentStatus = -1;
            }
          } else {
            allowBlockCollections = false;
          }
        }
      }
      if (allowBlockCollections) {
        allowBlockCollections = atNewLine || allowCompact;
      }
      if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
        if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
          flowIndent = parentIndent;
        } else {
          flowIndent = parentIndent + 1;
        }
        blockIndent = state.position - state.lineStart;
        if (indentStatus === 1) {
          if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
            hasContent = true;
          } else {
            if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
              hasContent = true;
            } else if (readAlias(state)) {
              hasContent = true;
              if (state.tag !== null || state.anchor !== null) {
                throwError(state, "alias node should not have any properties");
              }
            } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
              hasContent = true;
              if (state.tag === null) {
                state.tag = "?";
              }
            }
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else if (indentStatus === 0) {
          hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
        }
      }
      if (state.tag !== null && state.tag !== "!") {
        if (state.tag === "?") {
          if (state.result !== null && state.kind !== "scalar") {
            throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
          }
          for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
            type = state.implicitTypes[typeIndex];
            if (type.resolve(state.result)) {
              state.result = type.construct(state.result);
              state.tag = type.tag;
              if (state.anchor !== null) {
                state.anchorMap[state.anchor] = state.result;
              }
              break;
            }
          }
        } else if (_hasOwnProperty.call(state.typeMap[state.kind || "fallback"], state.tag)) {
          type = state.typeMap[state.kind || "fallback"][state.tag];
          if (state.result !== null && type.kind !== state.kind) {
            throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
          }
          if (!type.resolve(state.result)) {
            throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
          } else {
            state.result = type.construct(state.result);
            if (state.anchor !== null) {
              state.anchorMap[state.anchor] = state.result;
            }
          }
        } else {
          throwError(state, "unknown tag !<" + state.tag + ">");
        }
      }
      if (state.listener !== null) {
        state.listener("close", state);
      }
      return state.tag !== null || state.anchor !== null || hasContent;
    }
    function readDocument(state) {
      var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
      state.version = null;
      state.checkLineBreaks = state.legacy;
      state.tagMap = {};
      state.anchorMap = {};
      while ((ch = state.input.charCodeAt(state.position)) !== 0) {
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
        if (state.lineIndent > 0 || ch !== 37) {
          break;
        }
        hasDirectives = true;
        ch = state.input.charCodeAt(++state.position);
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveName = state.input.slice(_position, state.position);
        directiveArgs = [];
        if (directiveName.length < 1) {
          throwError(state, "directive name must not be less than one character in length");
        }
        while (ch !== 0) {
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 35) {
            do {
              ch = state.input.charCodeAt(++state.position);
            } while (ch !== 0 && !is_EOL(ch));
            break;
          }
          if (is_EOL(ch))
            break;
          _position = state.position;
          while (ch !== 0 && !is_WS_OR_EOL(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          directiveArgs.push(state.input.slice(_position, state.position));
        }
        if (ch !== 0)
          readLineBreak(state);
        if (_hasOwnProperty.call(directiveHandlers, directiveName)) {
          directiveHandlers[directiveName](state, directiveName, directiveArgs);
        } else {
          throwWarning(state, 'unknown document directive "' + directiveName + '"');
        }
      }
      skipSeparationSpace(state, true, -1);
      if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      } else if (hasDirectives) {
        throwError(state, "directives end mark is expected");
      }
      composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
      skipSeparationSpace(state, true, -1);
      if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
        throwWarning(state, "non-ASCII line breaks are interpreted as content");
      }
      state.documents.push(state.result);
      if (state.position === state.lineStart && testDocumentSeparator(state)) {
        if (state.input.charCodeAt(state.position) === 46) {
          state.position += 3;
          skipSeparationSpace(state, true, -1);
        }
        return;
      }
      if (state.position < state.length - 1) {
        throwError(state, "end of the stream or a document separator is expected");
      } else {
        return;
      }
    }
    function loadDocuments(input, options2) {
      input = String(input);
      options2 = options2 || {};
      if (input.length !== 0) {
        if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
          input += "\n";
        }
        if (input.charCodeAt(0) === 65279) {
          input = input.slice(1);
        }
      }
      var state = new State(input, options2);
      var nullpos = input.indexOf("\0");
      if (nullpos !== -1) {
        state.position = nullpos;
        throwError(state, "null byte is not allowed in input");
      }
      state.input += "\0";
      while (state.input.charCodeAt(state.position) === 32) {
        state.lineIndent += 1;
        state.position += 1;
      }
      while (state.position < state.length - 1) {
        readDocument(state);
      }
      return state.documents;
    }
    function loadAll(input, iterator, options2) {
      if (iterator !== null && typeof iterator === "object" && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      var documents = loadDocuments(input, options2);
      if (typeof iterator !== "function") {
        return documents;
      }
      for (var index2 = 0, length = documents.length; index2 < length; index2 += 1) {
        iterator(documents[index2]);
      }
    }
    function load2(input, options2) {
      var documents = loadDocuments(input, options2);
      if (documents.length === 0) {
        return void 0;
      } else if (documents.length === 1) {
        return documents[0];
      }
      throw new YAMLException("expected a single document in the stream, but found more");
    }
    function safeLoadAll(input, iterator, options2) {
      if (typeof iterator === "object" && iterator !== null && typeof options2 === "undefined") {
        options2 = iterator;
        iterator = null;
      }
      return loadAll(input, iterator, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    function safeLoad(input, options2) {
      return load2(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.loadAll = loadAll;
    module2.exports.load = load2;
    module2.exports.safeLoadAll = safeLoadAll;
    module2.exports.safeLoad = safeLoad;
  }
});

// node_modules/js-yaml/lib/js-yaml/dumper.js
var require_dumper = __commonJS({
  "node_modules/js-yaml/lib/js-yaml/dumper.js"(exports2, module2) {
    init_shims();
    "use strict";
    var common = require_common();
    var YAMLException = require_exception();
    var DEFAULT_FULL_SCHEMA = require_default_full();
    var DEFAULT_SAFE_SCHEMA = require_default_safe();
    var _toString = Object.prototype.toString;
    var _hasOwnProperty = Object.prototype.hasOwnProperty;
    var CHAR_TAB = 9;
    var CHAR_LINE_FEED = 10;
    var CHAR_CARRIAGE_RETURN = 13;
    var CHAR_SPACE = 32;
    var CHAR_EXCLAMATION = 33;
    var CHAR_DOUBLE_QUOTE = 34;
    var CHAR_SHARP = 35;
    var CHAR_PERCENT = 37;
    var CHAR_AMPERSAND = 38;
    var CHAR_SINGLE_QUOTE = 39;
    var CHAR_ASTERISK = 42;
    var CHAR_COMMA = 44;
    var CHAR_MINUS = 45;
    var CHAR_COLON = 58;
    var CHAR_EQUALS = 61;
    var CHAR_GREATER_THAN = 62;
    var CHAR_QUESTION = 63;
    var CHAR_COMMERCIAL_AT = 64;
    var CHAR_LEFT_SQUARE_BRACKET = 91;
    var CHAR_RIGHT_SQUARE_BRACKET = 93;
    var CHAR_GRAVE_ACCENT = 96;
    var CHAR_LEFT_CURLY_BRACKET = 123;
    var CHAR_VERTICAL_LINE = 124;
    var CHAR_RIGHT_CURLY_BRACKET = 125;
    var ESCAPE_SEQUENCES = {};
    ESCAPE_SEQUENCES[0] = "\\0";
    ESCAPE_SEQUENCES[7] = "\\a";
    ESCAPE_SEQUENCES[8] = "\\b";
    ESCAPE_SEQUENCES[9] = "\\t";
    ESCAPE_SEQUENCES[10] = "\\n";
    ESCAPE_SEQUENCES[11] = "\\v";
    ESCAPE_SEQUENCES[12] = "\\f";
    ESCAPE_SEQUENCES[13] = "\\r";
    ESCAPE_SEQUENCES[27] = "\\e";
    ESCAPE_SEQUENCES[34] = '\\"';
    ESCAPE_SEQUENCES[92] = "\\\\";
    ESCAPE_SEQUENCES[133] = "\\N";
    ESCAPE_SEQUENCES[160] = "\\_";
    ESCAPE_SEQUENCES[8232] = "\\L";
    ESCAPE_SEQUENCES[8233] = "\\P";
    var DEPRECATED_BOOLEANS_SYNTAX = [
      "y",
      "Y",
      "yes",
      "Yes",
      "YES",
      "on",
      "On",
      "ON",
      "n",
      "N",
      "no",
      "No",
      "NO",
      "off",
      "Off",
      "OFF"
    ];
    function compileStyleMap(schema, map) {
      var result, keys, index2, length, tag, style, type;
      if (map === null)
        return {};
      result = {};
      keys = Object.keys(map);
      for (index2 = 0, length = keys.length; index2 < length; index2 += 1) {
        tag = keys[index2];
        style = String(map[tag]);
        if (tag.slice(0, 2) === "!!") {
          tag = "tag:yaml.org,2002:" + tag.slice(2);
        }
        type = schema.compiledTypeMap["fallback"][tag];
        if (type && _hasOwnProperty.call(type.styleAliases, style)) {
          style = type.styleAliases[style];
        }
        result[tag] = style;
      }
      return result;
    }
    function encodeHex(character) {
      var string, handle, length;
      string = character.toString(16).toUpperCase();
      if (character <= 255) {
        handle = "x";
        length = 2;
      } else if (character <= 65535) {
        handle = "u";
        length = 4;
      } else if (character <= 4294967295) {
        handle = "U";
        length = 8;
      } else {
        throw new YAMLException("code point within a string may not be greater than 0xFFFFFFFF");
      }
      return "\\" + handle + common.repeat("0", length - string.length) + string;
    }
    function State(options2) {
      this.schema = options2["schema"] || DEFAULT_FULL_SCHEMA;
      this.indent = Math.max(1, options2["indent"] || 2);
      this.noArrayIndent = options2["noArrayIndent"] || false;
      this.skipInvalid = options2["skipInvalid"] || false;
      this.flowLevel = common.isNothing(options2["flowLevel"]) ? -1 : options2["flowLevel"];
      this.styleMap = compileStyleMap(this.schema, options2["styles"] || null);
      this.sortKeys = options2["sortKeys"] || false;
      this.lineWidth = options2["lineWidth"] || 80;
      this.noRefs = options2["noRefs"] || false;
      this.noCompatMode = options2["noCompatMode"] || false;
      this.condenseFlow = options2["condenseFlow"] || false;
      this.implicitTypes = this.schema.compiledImplicit;
      this.explicitTypes = this.schema.compiledExplicit;
      this.tag = null;
      this.result = "";
      this.duplicates = [];
      this.usedDuplicates = null;
    }
    function indentString(string, spaces) {
      var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
      while (position < length) {
        next = string.indexOf("\n", position);
        if (next === -1) {
          line = string.slice(position);
          position = length;
        } else {
          line = string.slice(position, next + 1);
          position = next + 1;
        }
        if (line.length && line !== "\n")
          result += ind;
        result += line;
      }
      return result;
    }
    function generateNextLine(state, level) {
      return "\n" + common.repeat(" ", state.indent * level);
    }
    function testImplicitResolving(state, str) {
      var index2, length, type;
      for (index2 = 0, length = state.implicitTypes.length; index2 < length; index2 += 1) {
        type = state.implicitTypes[index2];
        if (type.resolve(str)) {
          return true;
        }
      }
      return false;
    }
    function isWhitespace(c) {
      return c === CHAR_SPACE || c === CHAR_TAB;
    }
    function isPrintable(c) {
      return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== 65279 || 65536 <= c && c <= 1114111;
    }
    function isNsChar(c) {
      return isPrintable(c) && !isWhitespace(c) && c !== 65279 && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
    }
    function isPlainSafe(c, prev) {
      return isPrintable(c) && c !== 65279 && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_COLON && (c !== CHAR_SHARP || prev && isNsChar(prev));
    }
    function isPlainSafeFirst(c) {
      return isPrintable(c) && c !== 65279 && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
    }
    function needIndentIndicator(string) {
      var leadingSpaceRe = /^\n* /;
      return leadingSpaceRe.test(string);
    }
    var STYLE_PLAIN = 1;
    var STYLE_SINGLE = 2;
    var STYLE_LITERAL = 3;
    var STYLE_FOLDED = 4;
    var STYLE_DOUBLE = 5;
    function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType) {
      var i;
      var char, prev_char;
      var hasLineBreak = false;
      var hasFoldableLine = false;
      var shouldTrackWidth = lineWidth !== -1;
      var previousLineBreak = -1;
      var plain = isPlainSafeFirst(string.charCodeAt(0)) && !isWhitespace(string.charCodeAt(string.length - 1));
      if (singleLineOnly) {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
      } else {
        for (i = 0; i < string.length; i++) {
          char = string.charCodeAt(i);
          if (char === CHAR_LINE_FEED) {
            hasLineBreak = true;
            if (shouldTrackWidth) {
              hasFoldableLine = hasFoldableLine || i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
              previousLineBreak = i;
            }
          } else if (!isPrintable(char)) {
            return STYLE_DOUBLE;
          }
          prev_char = i > 0 ? string.charCodeAt(i - 1) : null;
          plain = plain && isPlainSafe(char, prev_char);
        }
        hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
      }
      if (!hasLineBreak && !hasFoldableLine) {
        return plain && !testAmbiguousType(string) ? STYLE_PLAIN : STYLE_SINGLE;
      }
      if (indentPerLevel > 9 && needIndentIndicator(string)) {
        return STYLE_DOUBLE;
      }
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    function writeScalar(state, string, level, iskey) {
      state.dump = function() {
        if (string.length === 0) {
          return "''";
        }
        if (!state.noCompatMode && DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1) {
          return "'" + string + "'";
        }
        var indent = state.indent * Math.max(1, level);
        var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
        var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
        function testAmbiguity(string2) {
          return testImplicitResolving(state, string2);
        }
        switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity)) {
          case STYLE_PLAIN:
            return string;
          case STYLE_SINGLE:
            return "'" + string.replace(/'/g, "''") + "'";
          case STYLE_LITERAL:
            return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
          case STYLE_FOLDED:
            return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
          case STYLE_DOUBLE:
            return '"' + escapeString(string, lineWidth) + '"';
          default:
            throw new YAMLException("impossible error: invalid scalar style");
        }
      }();
    }
    function blockHeader(string, indentPerLevel) {
      var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
      var clip = string[string.length - 1] === "\n";
      var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
      var chomp = keep ? "+" : clip ? "" : "-";
      return indentIndicator + chomp + "\n";
    }
    function dropEndingNewline(string) {
      return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
    }
    function foldString(string, width) {
      var lineRe = /(\n+)([^\n]*)/g;
      var result = function() {
        var nextLF = string.indexOf("\n");
        nextLF = nextLF !== -1 ? nextLF : string.length;
        lineRe.lastIndex = nextLF;
        return foldLine(string.slice(0, nextLF), width);
      }();
      var prevMoreIndented = string[0] === "\n" || string[0] === " ";
      var moreIndented;
      var match;
      while (match = lineRe.exec(string)) {
        var prefix = match[1], line = match[2];
        moreIndented = line[0] === " ";
        result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
        prevMoreIndented = moreIndented;
      }
      return result;
    }
    function foldLine(line, width) {
      if (line === "" || line[0] === " ")
        return line;
      var breakRe = / [^ ]/g;
      var match;
      var start = 0, end, curr = 0, next = 0;
      var result = "";
      while (match = breakRe.exec(line)) {
        next = match.index;
        if (next - start > width) {
          end = curr > start ? curr : next;
          result += "\n" + line.slice(start, end);
          start = end + 1;
        }
        curr = next;
      }
      result += "\n";
      if (line.length - start > width && curr > start) {
        result += line.slice(start, curr) + "\n" + line.slice(curr + 1);
      } else {
        result += line.slice(start);
      }
      return result.slice(1);
    }
    function escapeString(string) {
      var result = "";
      var char, nextChar;
      var escapeSeq;
      for (var i = 0; i < string.length; i++) {
        char = string.charCodeAt(i);
        if (char >= 55296 && char <= 56319) {
          nextChar = string.charCodeAt(i + 1);
          if (nextChar >= 56320 && nextChar <= 57343) {
            result += encodeHex((char - 55296) * 1024 + nextChar - 56320 + 65536);
            i++;
            continue;
          }
        }
        escapeSeq = ESCAPE_SEQUENCES[char];
        result += !escapeSeq && isPrintable(char) ? string[i] : escapeSeq || encodeHex(char);
      }
      return result;
    }
    function writeFlowSequence(state, level, object) {
      var _result = "", _tag = state.tag, index2, length;
      for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
        if (writeNode(state, level, object[index2], false, false)) {
          if (index2 !== 0)
            _result += "," + (!state.condenseFlow ? " " : "");
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = "[" + _result + "]";
    }
    function writeBlockSequence(state, level, object, compact) {
      var _result = "", _tag = state.tag, index2, length;
      for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
        if (writeNode(state, level + 1, object[index2], true, true)) {
          if (!compact || index2 !== 0) {
            _result += generateNextLine(state, level);
          }
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            _result += "-";
          } else {
            _result += "- ";
          }
          _result += state.dump;
        }
      }
      state.tag = _tag;
      state.dump = _result || "[]";
    }
    function writeFlowMapping(state, level, object) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index2, length, objectKey, objectValue, pairBuffer;
      for (index2 = 0, length = objectKeyList.length; index2 < length; index2 += 1) {
        pairBuffer = "";
        if (index2 !== 0)
          pairBuffer += ", ";
        if (state.condenseFlow)
          pairBuffer += '"';
        objectKey = objectKeyList[index2];
        objectValue = object[objectKey];
        if (!writeNode(state, level, objectKey, false, false)) {
          continue;
        }
        if (state.dump.length > 1024)
          pairBuffer += "? ";
        pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
        if (!writeNode(state, level, objectValue, false, false)) {
          continue;
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = "{" + _result + "}";
    }
    function writeBlockMapping(state, level, object, compact) {
      var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index2, length, objectKey, objectValue, explicitPair, pairBuffer;
      if (state.sortKeys === true) {
        objectKeyList.sort();
      } else if (typeof state.sortKeys === "function") {
        objectKeyList.sort(state.sortKeys);
      } else if (state.sortKeys) {
        throw new YAMLException("sortKeys must be a boolean or a function");
      }
      for (index2 = 0, length = objectKeyList.length; index2 < length; index2 += 1) {
        pairBuffer = "";
        if (!compact || index2 !== 0) {
          pairBuffer += generateNextLine(state, level);
        }
        objectKey = objectKeyList[index2];
        objectValue = object[objectKey];
        if (!writeNode(state, level + 1, objectKey, true, true, true)) {
          continue;
        }
        explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
        if (explicitPair) {
          if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
            pairBuffer += "?";
          } else {
            pairBuffer += "? ";
          }
        }
        pairBuffer += state.dump;
        if (explicitPair) {
          pairBuffer += generateNextLine(state, level);
        }
        if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
          continue;
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += ":";
        } else {
          pairBuffer += ": ";
        }
        pairBuffer += state.dump;
        _result += pairBuffer;
      }
      state.tag = _tag;
      state.dump = _result || "{}";
    }
    function detectType(state, object, explicit) {
      var _result, typeList, index2, length, type, style;
      typeList = explicit ? state.explicitTypes : state.implicitTypes;
      for (index2 = 0, length = typeList.length; index2 < length; index2 += 1) {
        type = typeList[index2];
        if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === "object" && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
          state.tag = explicit ? type.tag : "?";
          if (type.represent) {
            style = state.styleMap[type.tag] || type.defaultStyle;
            if (_toString.call(type.represent) === "[object Function]") {
              _result = type.represent(object, style);
            } else if (_hasOwnProperty.call(type.represent, style)) {
              _result = type.represent[style](object, style);
            } else {
              throw new YAMLException("!<" + type.tag + '> tag resolver accepts not "' + style + '" style');
            }
            state.dump = _result;
          }
          return true;
        }
      }
      return false;
    }
    function writeNode(state, level, object, block, compact, iskey) {
      state.tag = null;
      state.dump = object;
      if (!detectType(state, object, false)) {
        detectType(state, object, true);
      }
      var type = _toString.call(state.dump);
      if (block) {
        block = state.flowLevel < 0 || state.flowLevel > level;
      }
      var objectOrArray = type === "[object Object]" || type === "[object Array]", duplicateIndex, duplicate;
      if (objectOrArray) {
        duplicateIndex = state.duplicates.indexOf(object);
        duplicate = duplicateIndex !== -1;
      }
      if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
        compact = false;
      }
      if (duplicate && state.usedDuplicates[duplicateIndex]) {
        state.dump = "*ref_" + duplicateIndex;
      } else {
        if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
          state.usedDuplicates[duplicateIndex] = true;
        }
        if (type === "[object Object]") {
          if (block && Object.keys(state.dump).length !== 0) {
            writeBlockMapping(state, level, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowMapping(state, level, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object Array]") {
          var arrayLevel = state.noArrayIndent && level > 0 ? level - 1 : level;
          if (block && state.dump.length !== 0) {
            writeBlockSequence(state, arrayLevel, state.dump, compact);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + state.dump;
            }
          } else {
            writeFlowSequence(state, arrayLevel, state.dump);
            if (duplicate) {
              state.dump = "&ref_" + duplicateIndex + " " + state.dump;
            }
          }
        } else if (type === "[object String]") {
          if (state.tag !== "?") {
            writeScalar(state, state.dump, level, iskey);
          }
        } else {
          if (state.skipInvalid)
            return false;
          throw new YAMLException("unacceptable kind of an object to dump " + type);
        }
        if (state.tag !== null && state.tag !== "?") {
          state.dump = "!<" + state.tag + "> " + state.dump;
        }
      }
      return true;
    }
    function getDuplicateReferences(object, state) {
      var objects = [], duplicatesIndexes = [], index2, length;
      inspectNode(object, objects, duplicatesIndexes);
      for (index2 = 0, length = duplicatesIndexes.length; index2 < length; index2 += 1) {
        state.duplicates.push(objects[duplicatesIndexes[index2]]);
      }
      state.usedDuplicates = new Array(length);
    }
    function inspectNode(object, objects, duplicatesIndexes) {
      var objectKeyList, index2, length;
      if (object !== null && typeof object === "object") {
        index2 = objects.indexOf(object);
        if (index2 !== -1) {
          if (duplicatesIndexes.indexOf(index2) === -1) {
            duplicatesIndexes.push(index2);
          }
        } else {
          objects.push(object);
          if (Array.isArray(object)) {
            for (index2 = 0, length = object.length; index2 < length; index2 += 1) {
              inspectNode(object[index2], objects, duplicatesIndexes);
            }
          } else {
            objectKeyList = Object.keys(object);
            for (index2 = 0, length = objectKeyList.length; index2 < length; index2 += 1) {
              inspectNode(object[objectKeyList[index2]], objects, duplicatesIndexes);
            }
          }
        }
      }
    }
    function dump(input, options2) {
      options2 = options2 || {};
      var state = new State(options2);
      if (!state.noRefs)
        getDuplicateReferences(input, state);
      if (writeNode(state, 0, input, true, true))
        return state.dump + "\n";
      return "";
    }
    function safeDump(input, options2) {
      return dump(input, common.extend({ schema: DEFAULT_SAFE_SCHEMA }, options2));
    }
    module2.exports.dump = dump;
    module2.exports.safeDump = safeDump;
  }
});

// node_modules/js-yaml/lib/js-yaml.js
var require_js_yaml = __commonJS({
  "node_modules/js-yaml/lib/js-yaml.js"(exports2, module2) {
    init_shims();
    "use strict";
    var loader = require_loader();
    var dumper = require_dumper();
    function deprecated(name) {
      return function() {
        throw new Error("Function " + name + " is deprecated and cannot be used.");
      };
    }
    module2.exports.Type = require_type();
    module2.exports.Schema = require_schema();
    module2.exports.FAILSAFE_SCHEMA = require_failsafe();
    module2.exports.JSON_SCHEMA = require_json();
    module2.exports.CORE_SCHEMA = require_core();
    module2.exports.DEFAULT_SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_FULL_SCHEMA = require_default_full();
    module2.exports.load = loader.load;
    module2.exports.loadAll = loader.loadAll;
    module2.exports.safeLoad = loader.safeLoad;
    module2.exports.safeLoadAll = loader.safeLoadAll;
    module2.exports.dump = dumper.dump;
    module2.exports.safeDump = dumper.safeDump;
    module2.exports.YAMLException = require_exception();
    module2.exports.MINIMAL_SCHEMA = require_failsafe();
    module2.exports.SAFE_SCHEMA = require_default_safe();
    module2.exports.DEFAULT_SCHEMA = require_default_full();
    module2.exports.scan = deprecated("scan");
    module2.exports.parse = deprecated("parse");
    module2.exports.compose = deprecated("compose");
    module2.exports.addConstructor = deprecated("addConstructor");
  }
});

// node_modules/js-yaml/index.js
var require_js_yaml2 = __commonJS({
  "node_modules/js-yaml/index.js"(exports2, module2) {
    init_shims();
    "use strict";
    var yaml2 = require_js_yaml();
    module2.exports = yaml2;
  }
});

// node_modules/gray-matter/lib/engines.js
var require_engines = __commonJS({
  "node_modules/gray-matter/lib/engines.js"(exports, module) {
    init_shims();
    "use strict";
    var yaml = require_js_yaml2();
    var engines = exports = module.exports;
    engines.yaml = {
      parse: yaml.safeLoad.bind(yaml),
      stringify: yaml.safeDump.bind(yaml)
    };
    engines.json = {
      parse: JSON.parse.bind(JSON),
      stringify: function(obj, options2) {
        const opts = Object.assign({ replacer: null, space: 2 }, options2);
        return JSON.stringify(obj, opts.replacer, opts.space);
      }
    };
    engines.javascript = {
      parse: function parse(str, options, wrap) {
        try {
          if (wrap !== false) {
            str = "(function() {\nreturn " + str.trim() + ";\n}());";
          }
          return eval(str) || {};
        } catch (err) {
          if (wrap !== false && /(unexpected|identifier)/i.test(err.message)) {
            return parse(str, options, false);
          }
          throw new SyntaxError(err);
        }
      },
      stringify: function() {
        throw new Error("stringifying JavaScript is not supported");
      }
    };
  }
});

// node_modules/strip-bom-string/index.js
var require_strip_bom_string = __commonJS({
  "node_modules/strip-bom-string/index.js"(exports2, module2) {
    init_shims();
    "use strict";
    module2.exports = function(str) {
      if (typeof str === "string" && str.charAt(0) === "\uFEFF") {
        return str.slice(1);
      }
      return str;
    };
  }
});

// node_modules/gray-matter/lib/utils.js
var require_utils = __commonJS({
  "node_modules/gray-matter/lib/utils.js"(exports2) {
    init_shims();
    "use strict";
    var stripBom = require_strip_bom_string();
    var typeOf = require_kind_of();
    exports2.define = function(obj, key, val) {
      Reflect.defineProperty(obj, key, {
        enumerable: false,
        configurable: true,
        writable: true,
        value: val
      });
    };
    exports2.isBuffer = function(val) {
      return typeOf(val) === "buffer";
    };
    exports2.isObject = function(val) {
      return typeOf(val) === "object";
    };
    exports2.toBuffer = function(input) {
      return typeof input === "string" ? Buffer.from(input) : input;
    };
    exports2.toString = function(input) {
      if (exports2.isBuffer(input))
        return stripBom(String(input));
      if (typeof input !== "string") {
        throw new TypeError("expected input to be a string or buffer");
      }
      return stripBom(input);
    };
    exports2.arrayify = function(val) {
      return val ? Array.isArray(val) ? val : [val] : [];
    };
    exports2.startsWith = function(str, substr, len) {
      if (typeof len !== "number")
        len = substr.length;
      return str.slice(0, len) === substr;
    };
  }
});

// node_modules/gray-matter/lib/defaults.js
var require_defaults = __commonJS({
  "node_modules/gray-matter/lib/defaults.js"(exports2, module2) {
    init_shims();
    "use strict";
    var engines2 = require_engines();
    var utils = require_utils();
    module2.exports = function(options2) {
      const opts = Object.assign({}, options2);
      opts.delimiters = utils.arrayify(opts.delims || opts.delimiters || "---");
      if (opts.delimiters.length === 1) {
        opts.delimiters.push(opts.delimiters[0]);
      }
      opts.language = (opts.language || opts.lang || "yaml").toLowerCase();
      opts.engines = Object.assign({}, engines2, opts.parsers, opts.engines);
      return opts;
    };
  }
});

// node_modules/gray-matter/lib/engine.js
var require_engine = __commonJS({
  "node_modules/gray-matter/lib/engine.js"(exports2, module2) {
    init_shims();
    "use strict";
    module2.exports = function(name, options2) {
      let engine = options2.engines[name] || options2.engines[aliase(name)];
      if (typeof engine === "undefined") {
        throw new Error('gray-matter engine "' + name + '" is not registered');
      }
      if (typeof engine === "function") {
        engine = { parse: engine };
      }
      return engine;
    };
    function aliase(name) {
      switch (name.toLowerCase()) {
        case "js":
        case "javascript":
          return "javascript";
        case "coffee":
        case "coffeescript":
        case "cson":
          return "coffee";
        case "yaml":
        case "yml":
          return "yaml";
        default: {
          return name;
        }
      }
    }
  }
});

// node_modules/gray-matter/lib/stringify.js
var require_stringify = __commonJS({
  "node_modules/gray-matter/lib/stringify.js"(exports2, module2) {
    init_shims();
    "use strict";
    var typeOf = require_kind_of();
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(file, data, options2) {
      if (data == null && options2 == null) {
        switch (typeOf(file)) {
          case "object":
            data = file.data;
            options2 = {};
            break;
          case "string":
            return file;
          default: {
            throw new TypeError("expected file to be a string or object");
          }
        }
      }
      const str = file.content;
      const opts = defaults(options2);
      if (data == null) {
        if (!opts.data)
          return file;
        data = opts.data;
      }
      const language = file.language || opts.language;
      const engine = getEngine(language, opts);
      if (typeof engine.stringify !== "function") {
        throw new TypeError('expected "' + language + '.stringify" to be a function');
      }
      data = Object.assign({}, file.data, data);
      const open = opts.delimiters[0];
      const close = opts.delimiters[1];
      const matter = engine.stringify(data, options2).trim();
      let buf = "";
      if (matter !== "{}") {
        buf = newline(open) + newline(matter) + newline(close);
      }
      if (typeof file.excerpt === "string" && file.excerpt !== "") {
        if (str.indexOf(file.excerpt.trim()) === -1) {
          buf += newline(file.excerpt) + newline(close);
        }
      }
      return buf + newline(str);
    };
    function newline(str) {
      return str.slice(-1) !== "\n" ? str + "\n" : str;
    }
  }
});

// node_modules/gray-matter/lib/excerpt.js
var require_excerpt = __commonJS({
  "node_modules/gray-matter/lib/excerpt.js"(exports2, module2) {
    init_shims();
    "use strict";
    var defaults = require_defaults();
    module2.exports = function(file, options2) {
      const opts = defaults(options2);
      if (file.data == null) {
        file.data = {};
      }
      if (typeof opts.excerpt === "function") {
        return opts.excerpt(file, opts);
      }
      const sep = file.data.excerpt_separator || opts.excerpt_separator;
      if (sep == null && (opts.excerpt === false || opts.excerpt == null)) {
        return file;
      }
      const delimiter = typeof opts.excerpt === "string" ? opts.excerpt : sep || opts.delimiters[0];
      const idx = file.content.indexOf(delimiter);
      if (idx !== -1) {
        file.excerpt = file.content.slice(0, idx);
      }
      return file;
    };
  }
});

// node_modules/gray-matter/lib/to-file.js
var require_to_file = __commonJS({
  "node_modules/gray-matter/lib/to-file.js"(exports2, module2) {
    init_shims();
    "use strict";
    var typeOf = require_kind_of();
    var stringify = require_stringify();
    var utils = require_utils();
    module2.exports = function(file) {
      if (typeOf(file) !== "object") {
        file = { content: file };
      }
      if (typeOf(file.data) !== "object") {
        file.data = {};
      }
      if (file.contents && file.content == null) {
        file.content = file.contents;
      }
      utils.define(file, "orig", utils.toBuffer(file.content));
      utils.define(file, "language", file.language || "");
      utils.define(file, "matter", file.matter || "");
      utils.define(file, "stringify", function(data, options2) {
        if (options2 && options2.language) {
          file.language = options2.language;
        }
        return stringify(file, data, options2);
      });
      file.content = utils.toString(file.content);
      file.isEmpty = false;
      file.excerpt = "";
      return file;
    };
  }
});

// node_modules/gray-matter/lib/parse.js
var require_parse = __commonJS({
  "node_modules/gray-matter/lib/parse.js"(exports2, module2) {
    init_shims();
    "use strict";
    var getEngine = require_engine();
    var defaults = require_defaults();
    module2.exports = function(language, str, options2) {
      const opts = defaults(options2);
      const engine = getEngine(language, opts);
      if (typeof engine.parse !== "function") {
        throw new TypeError('expected "' + language + '.parse" to be a function');
      }
      return engine.parse(str, opts);
    };
  }
});

// node_modules/gray-matter/index.js
var require_gray_matter = __commonJS({
  "node_modules/gray-matter/index.js"(exports2, module2) {
    init_shims();
    "use strict";
    var fs2 = require("fs");
    var sections = require_section_matter();
    var defaults = require_defaults();
    var stringify = require_stringify();
    var excerpt = require_excerpt();
    var engines2 = require_engines();
    var toFile = require_to_file();
    var parse = require_parse();
    var utils = require_utils();
    function matter(input, options2) {
      if (input === "") {
        return { data: {}, content: input, excerpt: "", orig: input };
      }
      let file = toFile(input);
      const cached = matter.cache[file.content];
      if (!options2) {
        if (cached) {
          file = Object.assign({}, cached);
          file.orig = cached.orig;
          return file;
        }
        matter.cache[file.content] = file;
      }
      return parseMatter(file, options2);
    }
    function parseMatter(file, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      const close = "\n" + opts.delimiters[1];
      let str = file.content;
      if (opts.language) {
        file.language = opts.language;
      }
      const openLen = open.length;
      if (!utils.startsWith(str, open, openLen)) {
        excerpt(file, opts);
        return file;
      }
      if (str.charAt(openLen) === open.slice(-1)) {
        return file;
      }
      str = str.slice(openLen);
      const len = str.length;
      const language = matter.language(str, opts);
      if (language.name) {
        file.language = language.name;
        str = str.slice(language.raw.length);
      }
      let closeIndex = str.indexOf(close);
      if (closeIndex === -1) {
        closeIndex = len;
      }
      file.matter = str.slice(0, closeIndex);
      const block = file.matter.replace(/^\s*#[^\n]+/gm, "").trim();
      if (block === "") {
        file.isEmpty = true;
        file.empty = file.content;
        file.data = {};
      } else {
        file.data = parse(file.language, file.matter, opts);
      }
      if (closeIndex === len) {
        file.content = "";
      } else {
        file.content = str.slice(closeIndex + close.length);
        if (file.content[0] === "\r") {
          file.content = file.content.slice(1);
        }
        if (file.content[0] === "\n") {
          file.content = file.content.slice(1);
        }
      }
      excerpt(file, opts);
      if (opts.sections === true || typeof opts.section === "function") {
        sections(file, opts.section);
      }
      return file;
    }
    matter.engines = engines2;
    matter.stringify = function(file, data, options2) {
      if (typeof file === "string")
        file = matter(file, options2);
      return stringify(file, data, options2);
    };
    matter.read = function(filepath, options2) {
      const str = fs2.readFileSync(filepath, "utf8");
      const file = matter(str, options2);
      file.path = filepath;
      return file;
    };
    matter.test = function(str, options2) {
      return utils.startsWith(str, defaults(options2).delimiters[0]);
    };
    matter.language = function(str, options2) {
      const opts = defaults(options2);
      const open = opts.delimiters[0];
      if (matter.test(str)) {
        str = str.slice(open.length);
      }
      const language = str.slice(0, str.search(/\r?\n/));
      return {
        raw: language,
        name: language ? language.trim() : ""
      };
    };
    matter.cache = {};
    matter.clearCache = function() {
      matter.cache = {};
    };
    module2.exports = matter;
  }
});

// node_modules/prismjs/prism.js
var require_prism = __commonJS({
  "node_modules/prismjs/prism.js"(exports2, module2) {
    init_shims();
    var _self = typeof window !== "undefined" ? window : typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope ? self : {};
    var Prism2 = function(_self2) {
      var lang = /\blang(?:uage)?-([\w-]+)\b/i;
      var uniqueId = 0;
      var plainTextGrammar = {};
      var _ = {
        manual: _self2.Prism && _self2.Prism.manual,
        disableWorkerMessageHandler: _self2.Prism && _self2.Prism.disableWorkerMessageHandler,
        util: {
          encode: function encode(tokens) {
            if (tokens instanceof Token) {
              return new Token(tokens.type, encode(tokens.content), tokens.alias);
            } else if (Array.isArray(tokens)) {
              return tokens.map(encode);
            } else {
              return tokens.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/\u00a0/g, " ");
            }
          },
          type: function(o) {
            return Object.prototype.toString.call(o).slice(8, -1);
          },
          objId: function(obj) {
            if (!obj["__id"]) {
              Object.defineProperty(obj, "__id", { value: ++uniqueId });
            }
            return obj["__id"];
          },
          clone: function deepClone(o, visited) {
            visited = visited || {};
            var clone2;
            var id;
            switch (_.util.type(o)) {
              case "Object":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone2 = {};
                visited[id] = clone2;
                for (var key in o) {
                  if (o.hasOwnProperty(key)) {
                    clone2[key] = deepClone(o[key], visited);
                  }
                }
                return clone2;
              case "Array":
                id = _.util.objId(o);
                if (visited[id]) {
                  return visited[id];
                }
                clone2 = [];
                visited[id] = clone2;
                o.forEach(function(v, i) {
                  clone2[i] = deepClone(v, visited);
                });
                return clone2;
              default:
                return o;
            }
          },
          getLanguage: function(element) {
            while (element && !lang.test(element.className)) {
              element = element.parentElement;
            }
            if (element) {
              return (element.className.match(lang) || [, "none"])[1].toLowerCase();
            }
            return "none";
          },
          currentScript: function() {
            if (typeof document === "undefined") {
              return null;
            }
            if ("currentScript" in document && 1 < 2) {
              return document.currentScript;
            }
            try {
              throw new Error();
            } catch (err) {
              var src2 = (/at [^(\r\n]*\((.*):.+:.+\)$/i.exec(err.stack) || [])[1];
              if (src2) {
                var scripts = document.getElementsByTagName("script");
                for (var i in scripts) {
                  if (scripts[i].src == src2) {
                    return scripts[i];
                  }
                }
              }
              return null;
            }
          },
          isActive: function(element, className, defaultActivation) {
            var no = "no-" + className;
            while (element) {
              var classList = element.classList;
              if (classList.contains(className)) {
                return true;
              }
              if (classList.contains(no)) {
                return false;
              }
              element = element.parentElement;
            }
            return !!defaultActivation;
          }
        },
        languages: {
          plain: plainTextGrammar,
          plaintext: plainTextGrammar,
          text: plainTextGrammar,
          txt: plainTextGrammar,
          extend: function(id, redef) {
            var lang2 = _.util.clone(_.languages[id]);
            for (var key in redef) {
              lang2[key] = redef[key];
            }
            return lang2;
          },
          insertBefore: function(inside, before, insert, root) {
            root = root || _.languages;
            var grammar = root[inside];
            var ret = {};
            for (var token in grammar) {
              if (grammar.hasOwnProperty(token)) {
                if (token == before) {
                  for (var newToken in insert) {
                    if (insert.hasOwnProperty(newToken)) {
                      ret[newToken] = insert[newToken];
                    }
                  }
                }
                if (!insert.hasOwnProperty(token)) {
                  ret[token] = grammar[token];
                }
              }
            }
            var old = root[inside];
            root[inside] = ret;
            _.languages.DFS(_.languages, function(key, value) {
              if (value === old && key != inside) {
                this[key] = ret;
              }
            });
            return ret;
          },
          DFS: function DFS(o, callback, type, visited) {
            visited = visited || {};
            var objId = _.util.objId;
            for (var i in o) {
              if (o.hasOwnProperty(i)) {
                callback.call(o, i, o[i], type || i);
                var property = o[i];
                var propertyType = _.util.type(property);
                if (propertyType === "Object" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, null, visited);
                } else if (propertyType === "Array" && !visited[objId(property)]) {
                  visited[objId(property)] = true;
                  DFS(property, callback, i, visited);
                }
              }
            }
          }
        },
        plugins: {},
        highlightAll: function(async, callback) {
          _.highlightAllUnder(document, async, callback);
        },
        highlightAllUnder: function(container, async, callback) {
          var env = {
            callback,
            container,
            selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
          };
          _.hooks.run("before-highlightall", env);
          env.elements = Array.prototype.slice.apply(env.container.querySelectorAll(env.selector));
          _.hooks.run("before-all-elements-highlight", env);
          for (var i = 0, element; element = env.elements[i++]; ) {
            _.highlightElement(element, async === true, env.callback);
          }
        },
        highlightElement: function(element, async, callback) {
          var language = _.util.getLanguage(element);
          var grammar = _.languages[language];
          element.className = element.className.replace(lang, "").replace(/\s+/g, " ") + " language-" + language;
          var parent = element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre") {
            parent.className = parent.className.replace(lang, "").replace(/\s+/g, " ") + " language-" + language;
          }
          var code = element.textContent;
          var env = {
            element,
            language,
            grammar,
            code
          };
          function insertHighlightedCode(highlightedCode) {
            env.highlightedCode = highlightedCode;
            _.hooks.run("before-insert", env);
            env.element.innerHTML = env.highlightedCode;
            _.hooks.run("after-highlight", env);
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
          }
          _.hooks.run("before-sanity-check", env);
          parent = env.element.parentElement;
          if (parent && parent.nodeName.toLowerCase() === "pre" && !parent.hasAttribute("tabindex")) {
            parent.setAttribute("tabindex", "0");
          }
          if (!env.code) {
            _.hooks.run("complete", env);
            callback && callback.call(env.element);
            return;
          }
          _.hooks.run("before-highlight", env);
          if (!env.grammar) {
            insertHighlightedCode(_.util.encode(env.code));
            return;
          }
          if (async && _self2.Worker) {
            var worker = new Worker(_.filename);
            worker.onmessage = function(evt) {
              insertHighlightedCode(evt.data);
            };
            worker.postMessage(JSON.stringify({
              language: env.language,
              code: env.code,
              immediateClose: true
            }));
          } else {
            insertHighlightedCode(_.highlight(env.code, env.grammar, env.language));
          }
        },
        highlight: function(text, grammar, language) {
          var env = {
            code: text,
            grammar,
            language
          };
          _.hooks.run("before-tokenize", env);
          env.tokens = _.tokenize(env.code, env.grammar);
          _.hooks.run("after-tokenize", env);
          return Token.stringify(_.util.encode(env.tokens), env.language);
        },
        tokenize: function(text, grammar) {
          var rest = grammar.rest;
          if (rest) {
            for (var token in rest) {
              grammar[token] = rest[token];
            }
            delete grammar.rest;
          }
          var tokenList = new LinkedList();
          addAfter(tokenList, tokenList.head, text);
          matchGrammar(text, tokenList, grammar, tokenList.head, 0);
          return toArray(tokenList);
        },
        hooks: {
          all: {},
          add: function(name, callback) {
            var hooks = _.hooks.all;
            hooks[name] = hooks[name] || [];
            hooks[name].push(callback);
          },
          run: function(name, env) {
            var callbacks = _.hooks.all[name];
            if (!callbacks || !callbacks.length) {
              return;
            }
            for (var i = 0, callback; callback = callbacks[i++]; ) {
              callback(env);
            }
          }
        },
        Token
      };
      _self2.Prism = _;
      function Token(type, content, alias, matchedStr) {
        this.type = type;
        this.content = content;
        this.alias = alias;
        this.length = (matchedStr || "").length | 0;
      }
      Token.stringify = function stringify(o, language) {
        if (typeof o == "string") {
          return o;
        }
        if (Array.isArray(o)) {
          var s2 = "";
          o.forEach(function(e) {
            s2 += stringify(e, language);
          });
          return s2;
        }
        var env = {
          type: o.type,
          content: stringify(o.content, language),
          tag: "span",
          classes: ["token", o.type],
          attributes: {},
          language
        };
        var aliases = o.alias;
        if (aliases) {
          if (Array.isArray(aliases)) {
            Array.prototype.push.apply(env.classes, aliases);
          } else {
            env.classes.push(aliases);
          }
        }
        _.hooks.run("wrap", env);
        var attributes = "";
        for (var name in env.attributes) {
          attributes += " " + name + '="' + (env.attributes[name] || "").replace(/"/g, "&quot;") + '"';
        }
        return "<" + env.tag + ' class="' + env.classes.join(" ") + '"' + attributes + ">" + env.content + "</" + env.tag + ">";
      };
      function matchPattern(pattern, pos, text, lookbehind) {
        pattern.lastIndex = pos;
        var match = pattern.exec(text);
        if (match && lookbehind && match[1]) {
          var lookbehindLength = match[1].length;
          match.index += lookbehindLength;
          match[0] = match[0].slice(lookbehindLength);
        }
        return match;
      }
      function matchGrammar(text, tokenList, grammar, startNode, startPos, rematch) {
        for (var token in grammar) {
          if (!grammar.hasOwnProperty(token) || !grammar[token]) {
            continue;
          }
          var patterns = grammar[token];
          patterns = Array.isArray(patterns) ? patterns : [patterns];
          for (var j = 0; j < patterns.length; ++j) {
            if (rematch && rematch.cause == token + "," + j) {
              return;
            }
            var patternObj = patterns[j];
            var inside = patternObj.inside;
            var lookbehind = !!patternObj.lookbehind;
            var greedy = !!patternObj.greedy;
            var alias = patternObj.alias;
            if (greedy && !patternObj.pattern.global) {
              var flags = patternObj.pattern.toString().match(/[imsuy]*$/)[0];
              patternObj.pattern = RegExp(patternObj.pattern.source, flags + "g");
            }
            var pattern = patternObj.pattern || patternObj;
            for (var currentNode = startNode.next, pos = startPos; currentNode !== tokenList.tail; pos += currentNode.value.length, currentNode = currentNode.next) {
              if (rematch && pos >= rematch.reach) {
                break;
              }
              var str = currentNode.value;
              if (tokenList.length > text.length) {
                return;
              }
              if (str instanceof Token) {
                continue;
              }
              var removeCount = 1;
              var match;
              if (greedy) {
                match = matchPattern(pattern, pos, text, lookbehind);
                if (!match) {
                  break;
                }
                var from = match.index;
                var to = match.index + match[0].length;
                var p = pos;
                p += currentNode.value.length;
                while (from >= p) {
                  currentNode = currentNode.next;
                  p += currentNode.value.length;
                }
                p -= currentNode.value.length;
                pos = p;
                if (currentNode.value instanceof Token) {
                  continue;
                }
                for (var k = currentNode; k !== tokenList.tail && (p < to || typeof k.value === "string"); k = k.next) {
                  removeCount++;
                  p += k.value.length;
                }
                removeCount--;
                str = text.slice(pos, p);
                match.index -= pos;
              } else {
                match = matchPattern(pattern, 0, str, lookbehind);
                if (!match) {
                  continue;
                }
              }
              var from = match.index;
              var matchStr = match[0];
              var before = str.slice(0, from);
              var after = str.slice(from + matchStr.length);
              var reach = pos + str.length;
              if (rematch && reach > rematch.reach) {
                rematch.reach = reach;
              }
              var removeFrom = currentNode.prev;
              if (before) {
                removeFrom = addAfter(tokenList, removeFrom, before);
                pos += before.length;
              }
              removeRange(tokenList, removeFrom, removeCount);
              var wrapped = new Token(token, inside ? _.tokenize(matchStr, inside) : matchStr, alias, matchStr);
              currentNode = addAfter(tokenList, removeFrom, wrapped);
              if (after) {
                addAfter(tokenList, currentNode, after);
              }
              if (removeCount > 1) {
                var nestedRematch = {
                  cause: token + "," + j,
                  reach
                };
                matchGrammar(text, tokenList, grammar, currentNode.prev, pos, nestedRematch);
                if (rematch && nestedRematch.reach > rematch.reach) {
                  rematch.reach = nestedRematch.reach;
                }
              }
            }
          }
        }
      }
      function LinkedList() {
        var head = { value: null, prev: null, next: null };
        var tail = { value: null, prev: head, next: null };
        head.next = tail;
        this.head = head;
        this.tail = tail;
        this.length = 0;
      }
      function addAfter(list, node, value) {
        var next = node.next;
        var newNode = { value, prev: node, next };
        node.next = newNode;
        next.prev = newNode;
        list.length++;
        return newNode;
      }
      function removeRange(list, node, count) {
        var next = node.next;
        for (var i = 0; i < count && next !== list.tail; i++) {
          next = next.next;
        }
        node.next = next;
        next.prev = node;
        list.length -= i;
      }
      function toArray(list) {
        var array = [];
        var node = list.head.next;
        while (node !== list.tail) {
          array.push(node.value);
          node = node.next;
        }
        return array;
      }
      if (!_self2.document) {
        if (!_self2.addEventListener) {
          return _;
        }
        if (!_.disableWorkerMessageHandler) {
          _self2.addEventListener("message", function(evt) {
            var message = JSON.parse(evt.data);
            var lang2 = message.language;
            var code = message.code;
            var immediateClose = message.immediateClose;
            _self2.postMessage(_.highlight(code, _.languages[lang2], lang2));
            if (immediateClose) {
              _self2.close();
            }
          }, false);
        }
        return _;
      }
      var script = _.util.currentScript();
      if (script) {
        _.filename = script.src;
        if (script.hasAttribute("data-manual")) {
          _.manual = true;
        }
      }
      function highlightAutomaticallyCallback() {
        if (!_.manual) {
          _.highlightAll();
        }
      }
      if (!_.manual) {
        var readyState = document.readyState;
        if (readyState === "loading" || readyState === "interactive" && script && script.defer) {
          document.addEventListener("DOMContentLoaded", highlightAutomaticallyCallback);
        } else {
          if (window.requestAnimationFrame) {
            window.requestAnimationFrame(highlightAutomaticallyCallback);
          } else {
            window.setTimeout(highlightAutomaticallyCallback, 16);
          }
        }
      }
      return _;
    }(_self);
    if (typeof module2 !== "undefined" && module2.exports) {
      module2.exports = Prism2;
    }
    if (typeof global !== "undefined") {
      global.Prism = Prism2;
    }
    Prism2.languages.markup = {
      "comment": /<!--[\s\S]*?-->/,
      "prolog": /<\?[\s\S]+?\?>/,
      "doctype": {
        pattern: /<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,
        greedy: true,
        inside: {
          "internal-subset": {
            pattern: /(^[^\[]*\[)[\s\S]+(?=\]>$)/,
            lookbehind: true,
            greedy: true,
            inside: null
          },
          "string": {
            pattern: /"[^"]*"|'[^']*'/,
            greedy: true
          },
          "punctuation": /^<!|>$|[[\]]/,
          "doctype-tag": /^DOCTYPE/,
          "name": /[^\s<>'"]+/
        }
      },
      "cdata": /<!\[CDATA\[[\s\S]*?\]\]>/i,
      "tag": {
        pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,
        greedy: true,
        inside: {
          "tag": {
            pattern: /^<\/?[^\s>\/]+/,
            inside: {
              "punctuation": /^<\/?/,
              "namespace": /^[^\s>\/:]+:/
            }
          },
          "special-attr": [],
          "attr-value": {
            pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,
            inside: {
              "punctuation": [
                {
                  pattern: /^=/,
                  alias: "attr-equals"
                },
                /"|'/
              ]
            }
          },
          "punctuation": /\/?>/,
          "attr-name": {
            pattern: /[^\s>\/]+/,
            inside: {
              "namespace": /^[^\s>\/:]+:/
            }
          }
        }
      },
      "entity": [
        {
          pattern: /&[\da-z]{1,8};/i,
          alias: "named-entity"
        },
        /&#x?[\da-f]{1,8};/i
      ]
    };
    Prism2.languages.markup["tag"].inside["attr-value"].inside["entity"] = Prism2.languages.markup["entity"];
    Prism2.languages.markup["doctype"].inside["internal-subset"].inside = Prism2.languages.markup;
    Prism2.hooks.add("wrap", function(env) {
      if (env.type === "entity") {
        env.attributes["title"] = env.content.replace(/&amp;/, "&");
      }
    });
    Object.defineProperty(Prism2.languages.markup.tag, "addInlined", {
      value: function addInlined(tagName, lang) {
        var includedCdataInside = {};
        includedCdataInside["language-" + lang] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: true,
          inside: Prism2.languages[lang]
        };
        includedCdataInside["cdata"] = /^<!\[CDATA\[|\]\]>$/i;
        var inside = {
          "included-cdata": {
            pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i,
            inside: includedCdataInside
          }
        };
        inside["language-" + lang] = {
          pattern: /[\s\S]+/,
          inside: Prism2.languages[lang]
        };
        var def = {};
        def[tagName] = {
          pattern: RegExp(/(<__[^>]*>)(?:<!\[CDATA\[(?:[^\]]|\](?!\]>))*\]\]>|(?!<!\[CDATA\[)[\s\S])*?(?=<\/__>)/.source.replace(/__/g, function() {
            return tagName;
          }), "i"),
          lookbehind: true,
          greedy: true,
          inside
        };
        Prism2.languages.insertBefore("markup", "cdata", def);
      }
    });
    Object.defineProperty(Prism2.languages.markup.tag, "addAttribute", {
      value: function(attrName, lang) {
        Prism2.languages.markup.tag.inside["special-attr"].push({
          pattern: RegExp(/(^|["'\s])/.source + "(?:" + attrName + ")" + /\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))/.source, "i"),
          lookbehind: true,
          inside: {
            "attr-name": /^[^\s=]+/,
            "attr-value": {
              pattern: /=[\s\S]+/,
              inside: {
                "value": {
                  pattern: /(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,
                  lookbehind: true,
                  alias: [lang, "language-" + lang],
                  inside: Prism2.languages[lang]
                },
                "punctuation": [
                  {
                    pattern: /^=/,
                    alias: "attr-equals"
                  },
                  /"|'/
                ]
              }
            }
          }
        });
      }
    });
    Prism2.languages.html = Prism2.languages.markup;
    Prism2.languages.mathml = Prism2.languages.markup;
    Prism2.languages.svg = Prism2.languages.markup;
    Prism2.languages.xml = Prism2.languages.extend("markup", {});
    Prism2.languages.ssml = Prism2.languages.xml;
    Prism2.languages.atom = Prism2.languages.xml;
    Prism2.languages.rss = Prism2.languages.xml;
    (function(Prism3) {
      var string = /(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/;
      Prism3.languages.css = {
        "comment": /\/\*[\s\S]*?\*\//,
        "atrule": {
          pattern: /@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,
          inside: {
            "rule": /^@[\w-]+/,
            "selector-function-argument": {
              pattern: /(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,
              lookbehind: true,
              alias: "selector"
            },
            "keyword": {
              pattern: /(^|[^\w-])(?:and|not|only|or)(?![\w-])/,
              lookbehind: true
            }
          }
        },
        "url": {
          pattern: RegExp("\\burl\\((?:" + string.source + "|" + /(?:[^\\\r\n()"']|\\[\s\S])*/.source + ")\\)", "i"),
          greedy: true,
          inside: {
            "function": /^url/i,
            "punctuation": /^\(|\)$/,
            "string": {
              pattern: RegExp("^" + string.source + "$"),
              alias: "url"
            }
          }
        },
        "selector": {
          pattern: RegExp(`(^|[{}\\s])[^{}\\s](?:[^{};"'\\s]|\\s+(?![\\s{])|` + string.source + ")*(?=\\s*\\{)"),
          lookbehind: true
        },
        "string": {
          pattern: string,
          greedy: true
        },
        "property": {
          pattern: /(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,
          lookbehind: true
        },
        "important": /!important\b/i,
        "function": {
          pattern: /(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,
          lookbehind: true
        },
        "punctuation": /[(){};:,]/
      };
      Prism3.languages.css["atrule"].inside.rest = Prism3.languages.css;
      var markup = Prism3.languages.markup;
      if (markup) {
        markup.tag.addInlined("style", "css");
        markup.tag.addAttribute("style", "css");
      }
    })(Prism2);
    Prism2.languages.clike = {
      "comment": [
        {
          pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
          lookbehind: true,
          greedy: true
        },
        {
          pattern: /(^|[^\\:])\/\/.*/,
          lookbehind: true,
          greedy: true
        }
      ],
      "string": {
        pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
        greedy: true
      },
      "class-name": {
        pattern: /(\b(?:class|interface|extends|implements|trait|instanceof|new)\s+|\bcatch\s+\()[\w.\\]+/i,
        lookbehind: true,
        inside: {
          "punctuation": /[.\\]/
        }
      },
      "keyword": /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
      "boolean": /\b(?:true|false)\b/,
      "function": /\b\w+(?=\()/,
      "number": /\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,
      "operator": /[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,
      "punctuation": /[{}[\];(),.:]/
    };
    Prism2.languages.javascript = Prism2.languages.extend("clike", {
      "class-name": [
        Prism2.languages.clike["class-name"],
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:prototype|constructor))/,
          lookbehind: true
        }
      ],
      "keyword": [
        {
          pattern: /((?:^|\})\s*)catch\b/,
          lookbehind: true
        },
        {
          pattern: /(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
          lookbehind: true
        }
      ],
      "function": /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
      "number": /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
      "operator": /--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/
    });
    Prism2.languages.javascript["class-name"][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/;
    Prism2.languages.insertBefore("javascript", "keyword", {
      "regex": {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s]|\b(?:return|yield))\s*)\/(?:\[(?:[^\]\\\r\n]|\\.)*\]|\\.|[^/\\\[\r\n])+\/[dgimyus]{0,7}(?=(?:\s|\/\*(?:[^*]|\*(?!\/))*\*\/)*(?:$|[\r\n,.;:})\]]|\/\/))/,
        lookbehind: true,
        greedy: true,
        inside: {
          "regex-source": {
            pattern: /^(\/)[\s\S]+(?=\/[a-z]*$)/,
            lookbehind: true,
            alias: "language-regex",
            inside: Prism2.languages.regex
          },
          "regex-delimiter": /^\/|\/$/,
          "regex-flags": /^[a-z]+$/
        }
      },
      "function-variable": {
        pattern: /#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,
        alias: "function"
      },
      "parameter": [
        {
          pattern: /(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,
          lookbehind: true,
          inside: Prism2.languages.javascript
        },
        {
          pattern: /(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,
          lookbehind: true,
          inside: Prism2.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,
          lookbehind: true,
          inside: Prism2.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,
          lookbehind: true,
          inside: Prism2.languages.javascript
        }
      ],
      "constant": /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    });
    Prism2.languages.insertBefore("javascript", "string", {
      "hashbang": {
        pattern: /^#!.*/,
        greedy: true,
        alias: "comment"
      },
      "template-string": {
        pattern: /`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,
        greedy: true,
        inside: {
          "template-punctuation": {
            pattern: /^`|`$/,
            alias: "string"
          },
          "interpolation": {
            pattern: /((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,
            lookbehind: true,
            inside: {
              "interpolation-punctuation": {
                pattern: /^\$\{|\}$/,
                alias: "punctuation"
              },
              rest: Prism2.languages.javascript
            }
          },
          "string": /[\s\S]+/
        }
      }
    });
    if (Prism2.languages.markup) {
      Prism2.languages.markup.tag.addInlined("script", "javascript");
      Prism2.languages.markup.tag.addAttribute(/on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)/.source, "javascript");
    }
    Prism2.languages.js = Prism2.languages.javascript;
    (function() {
      if (typeof Prism2 === "undefined" || typeof document === "undefined") {
        return;
      }
      if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
      }
      var LOADING_MESSAGE = "Loading\u2026";
      var FAILURE_MESSAGE = function(status, message) {
        return "\u2716 Error " + status + " while fetching file: " + message;
      };
      var FAILURE_EMPTY_MESSAGE = "\u2716 Error: File does not exist or is empty";
      var EXTENSIONS = {
        "js": "javascript",
        "py": "python",
        "rb": "ruby",
        "ps1": "powershell",
        "psm1": "powershell",
        "sh": "bash",
        "bat": "batch",
        "h": "c",
        "tex": "latex"
      };
      var STATUS_ATTR = "data-src-status";
      var STATUS_LOADING = "loading";
      var STATUS_LOADED = "loaded";
      var STATUS_FAILED = "failed";
      var SELECTOR = "pre[data-src]:not([" + STATUS_ATTR + '="' + STATUS_LOADED + '"]):not([' + STATUS_ATTR + '="' + STATUS_LOADING + '"])';
      var lang = /\blang(?:uage)?-([\w-]+)\b/i;
      function setLanguageClass(element, language) {
        var className = element.className;
        className = className.replace(lang, " ") + " language-" + language;
        element.className = className.replace(/\s+/g, " ").trim();
      }
      Prism2.hooks.add("before-highlightall", function(env) {
        env.selector += ", " + SELECTOR;
      });
      Prism2.hooks.add("before-sanity-check", function(env) {
        var pre = env.element;
        if (pre.matches(SELECTOR)) {
          env.code = "";
          pre.setAttribute(STATUS_ATTR, STATUS_LOADING);
          var code = pre.appendChild(document.createElement("CODE"));
          code.textContent = LOADING_MESSAGE;
          var src2 = pre.getAttribute("data-src");
          var language = env.language;
          if (language === "none") {
            var extension = (/\.(\w+)$/.exec(src2) || [, "none"])[1];
            language = EXTENSIONS[extension] || extension;
          }
          setLanguageClass(code, language);
          setLanguageClass(pre, language);
          var autoloader = Prism2.plugins.autoloader;
          if (autoloader) {
            autoloader.loadLanguages(language);
          }
          var xhr = new XMLHttpRequest();
          xhr.open("GET", src2, true);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
              if (xhr.status < 400 && xhr.responseText) {
                pre.setAttribute(STATUS_ATTR, STATUS_LOADED);
                code.textContent = xhr.responseText;
                Prism2.highlightElement(code);
              } else {
                pre.setAttribute(STATUS_ATTR, STATUS_FAILED);
                if (xhr.status >= 400) {
                  code.textContent = FAILURE_MESSAGE(xhr.status, xhr.statusText);
                } else {
                  code.textContent = FAILURE_EMPTY_MESSAGE;
                }
              }
            }
          };
          xhr.send(null);
        }
      });
      Prism2.plugins.fileHighlight = {
        highlight: function highlight(container) {
          var elements = (container || document).querySelectorAll(SELECTOR);
          for (var i = 0, element; element = elements[i++]; ) {
            Prism2.highlightElement(element);
          }
        }
      };
      var logged = false;
      Prism2.fileHighlight = function() {
        if (!logged) {
          console.warn("Prism.fileHighlight is deprecated. Use `Prism.plugins.fileHighlight.highlight` instead.");
          logged = true;
        }
        Prism2.plugins.fileHighlight.highlight.apply(this, arguments);
      };
    })();
  }
});

// .svelte-kit/netlify/entry.js
__export(exports, {
  handler: () => handler
});
init_shims();

// .svelte-kit/output/server/app.js
init_shims();

// node_modules/@sveltejs/kit/dist/ssr.js
init_shims();

// node_modules/@sveltejs/kit/dist/adapter-utils.js
init_shims();
function isContentTypeTextual(content_type) {
  if (!content_type)
    return true;
  const [type] = content_type.split(";");
  return type === "text/plain" || type === "application/json" || type === "application/x-www-form-urlencoded" || type === "multipart/form-data";
}

// node_modules/@sveltejs/kit/dist/ssr.js
var chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
var unsafeChars = /[<>\b\f\n\r\t\0\u2028\u2029]/g;
var reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
var escaped$1 = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var objectProtoOwnPropertyNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function devalue(value) {
  var counts = new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new Error("Cannot stringify a function");
    }
    if (counts.has(thing)) {
      counts.set(thing, counts.get(thing) + 1);
      return;
    }
    counts.set(thing, 1);
    if (!isPrimitive(thing)) {
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach(walk);
          break;
        case "Set":
        case "Map":
          Array.from(thing).forEach(walk);
          break;
        default:
          var proto = Object.getPrototypeOf(thing);
          if (proto !== Object.prototype && proto !== null && Object.getOwnPropertyNames(proto).sort().join("\0") !== objectProtoOwnPropertyNames) {
            throw new Error("Cannot stringify arbitrary non-POJOs");
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new Error("Cannot stringify POJOs with symbolic keys");
          }
          Object.keys(thing).forEach(function(key) {
            return walk(thing[key]);
          });
      }
    }
  }
  walk(value);
  var names = new Map();
  Array.from(counts).filter(function(entry) {
    return entry[1] > 1;
  }).sort(function(a, b) {
    return b[1] - a[1];
  }).forEach(function(entry, i) {
    names.set(entry[0], getName(i));
  });
  function stringify(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (isPrimitive(thing)) {
      return stringifyPrimitive(thing);
    }
    var type = getType(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return "Object(" + stringify(thing.valueOf()) + ")";
      case "RegExp":
        return "new RegExp(" + stringifyString(thing.source) + ', "' + thing.flags + '")';
      case "Date":
        return "new Date(" + thing.getTime() + ")";
      case "Array":
        var members = thing.map(function(v, i) {
          return i in thing ? stringify(v) : "";
        });
        var tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return "[" + members.join(",") + tail + "]";
      case "Set":
      case "Map":
        return "new " + type + "([" + Array.from(thing).map(stringify).join(",") + "])";
      default:
        var obj = "{" + Object.keys(thing).map(function(key) {
          return safeKey(key) + ":" + stringify(thing[key]);
        }).join(",") + "}";
        var proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? "Object.assign(Object.create(null)," + obj + ")" : "Object.create(null)";
        }
        return obj;
    }
  }
  var str = stringify(value);
  if (names.size) {
    var params_1 = [];
    var statements_1 = [];
    var values_1 = [];
    names.forEach(function(name, thing) {
      params_1.push(name);
      if (isPrimitive(thing)) {
        values_1.push(stringifyPrimitive(thing));
        return;
      }
      var type = getType(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values_1.push("Object(" + stringify(thing.valueOf()) + ")");
          break;
        case "RegExp":
          values_1.push(thing.toString());
          break;
        case "Date":
          values_1.push("new Date(" + thing.getTime() + ")");
          break;
        case "Array":
          values_1.push("Array(" + thing.length + ")");
          thing.forEach(function(v, i) {
            statements_1.push(name + "[" + i + "]=" + stringify(v));
          });
          break;
        case "Set":
          values_1.push("new Set");
          statements_1.push(name + "." + Array.from(thing).map(function(v) {
            return "add(" + stringify(v) + ")";
          }).join("."));
          break;
        case "Map":
          values_1.push("new Map");
          statements_1.push(name + "." + Array.from(thing).map(function(_a) {
            var k = _a[0], v = _a[1];
            return "set(" + stringify(k) + ", " + stringify(v) + ")";
          }).join("."));
          break;
        default:
          values_1.push(Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}");
          Object.keys(thing).forEach(function(key) {
            statements_1.push("" + name + safeProp(key) + "=" + stringify(thing[key]));
          });
      }
    });
    statements_1.push("return " + str);
    return "(function(" + params_1.join(",") + "){" + statements_1.join(";") + "}(" + values_1.join(",") + "))";
  } else {
    return str;
  }
}
function getName(num) {
  var name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? name + "_" : name;
}
function isPrimitive(thing) {
  return Object(thing) !== thing;
}
function stringifyPrimitive(thing) {
  if (typeof thing === "string")
    return stringifyString(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  var str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  return str;
}
function getType(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function escapeUnsafeChar(c) {
  return escaped$1[c] || c;
}
function escapeUnsafeChars(str) {
  return str.replace(unsafeChars, escapeUnsafeChar);
}
function safeKey(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? key : escapeUnsafeChars(JSON.stringify(key));
}
function safeProp(key) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key) ? "." + key : "[" + escapeUnsafeChars(JSON.stringify(key)) + "]";
}
function stringifyString(str) {
  var result = '"';
  for (var i = 0; i < str.length; i += 1) {
    var char = str.charAt(i);
    var code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped$1) {
      result += escaped$1[char];
    } else if (code >= 55296 && code <= 57343) {
      var next = str.charCodeAt(i + 1);
      if (code <= 56319 && (next >= 56320 && next <= 57343)) {
        result += char + str[++i];
      } else {
        result += "\\u" + code.toString(16).toUpperCase();
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
function noop() {
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || (a && typeof a === "object" || typeof a === "function");
}
var subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = [];
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (let i = 0; i < subscribers.length; i += 1) {
          const s2 = subscribers[i];
          s2[1]();
          subscriber_queue.push(s2, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set(fn(value));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.push(subscriber);
    if (subscribers.length === 1) {
      stop = start(set) || noop;
    }
    run2(value);
    return () => {
      const index2 = subscribers.indexOf(subscriber);
      if (index2 !== -1) {
        subscribers.splice(index2, 1);
      }
      if (subscribers.length === 0) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update, subscribe };
}
function hash(value) {
  let hash2 = 5381;
  let i = value.length;
  if (typeof value === "string") {
    while (i)
      hash2 = hash2 * 33 ^ value.charCodeAt(--i);
  } else {
    while (i)
      hash2 = hash2 * 33 ^ value[--i];
  }
  return (hash2 >>> 0).toString(36);
}
var s$1 = JSON.stringify;
async function render_response({
  options: options2,
  $session,
  page_config,
  status,
  error: error2,
  branch,
  page
}) {
  const css2 = new Set(options2.entry.css);
  const js = new Set(options2.entry.js);
  const styles = new Set();
  const serialized_data = [];
  let rendered;
  let is_private = false;
  let maxage;
  if (error2) {
    error2.stack = options2.get_stack(error2);
  }
  if (branch) {
    branch.forEach(({ node, loaded, fetched, uses_credentials }) => {
      if (node.css)
        node.css.forEach((url) => css2.add(url));
      if (node.js)
        node.js.forEach((url) => js.add(url));
      if (node.styles)
        node.styles.forEach((content) => styles.add(content));
      if (fetched && page_config.hydrate)
        serialized_data.push(...fetched);
      if (uses_credentials)
        is_private = true;
      maxage = loaded.maxage;
    });
    const session = writable($session);
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        session
      },
      page,
      components: branch.map(({ node }) => node.module.default)
    };
    for (let i = 0; i < branch.length; i += 1) {
      props[`props_${i}`] = await branch[i].loaded.props;
    }
    let session_tracking_active = false;
    const unsubscribe = session.subscribe(() => {
      if (session_tracking_active)
        is_private = true;
    });
    session_tracking_active = true;
    try {
      rendered = options2.root.render(props);
    } finally {
      unsubscribe();
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  const include_js = page_config.router || page_config.hydrate;
  if (!include_js)
    js.clear();
  const links = options2.amp ? styles.size > 0 || rendered.css.code.length > 0 ? `<style amp-custom>${Array.from(styles).concat(rendered.css.code).join("\n")}</style>` : "" : [
    ...Array.from(js).map((dep) => `<link rel="modulepreload" href="${dep}">`),
    ...Array.from(css2).map((dep) => `<link rel="stylesheet" href="${dep}">`)
  ].join("\n		");
  let init2 = "";
  if (options2.amp) {
    init2 = `
		<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style>
		<noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>
		<script async src="https://cdn.ampproject.org/v0.js"><\/script>`;
  } else if (include_js) {
    init2 = `<script type="module">
			import { start } from ${s$1(options2.entry.file)};
			start({
				target: ${options2.target ? `document.querySelector(${s$1(options2.target)})` : "document.body"},
				paths: ${s$1(options2.paths)},
				session: ${try_serialize($session, (error3) => {
      throw new Error(`Failed to serialize session data: ${error3.message}`);
    })},
				host: ${page && page.host ? s$1(page.host) : "location.host"},
				route: ${!!page_config.router},
				spa: ${!page_config.ssr},
				trailing_slash: ${s$1(options2.trailing_slash)},
				hydrate: ${page_config.ssr && page_config.hydrate ? `{
					status: ${status},
					error: ${serialize_error(error2)},
					nodes: [
						${branch.map(({ node }) => `import(${s$1(node.entry)})`).join(",\n						")}
					],
					page: {
						host: ${page.host ? s$1(page.host) : "location.host"}, // TODO this is redundant
						path: ${s$1(page.path)},
						query: new URLSearchParams(${s$1(page.query.toString())}),
						params: ${s$1(page.params)}
					}
				}` : "null"}
			});
		<\/script>`;
  }
  if (options2.service_worker) {
    init2 += `<script>
			if ('serviceWorker' in navigator) {
				navigator.serviceWorker.register('${options2.service_worker}');
			}
		<\/script>`;
  }
  const head = [
    rendered.head,
    styles.size && !options2.amp ? `<style data-svelte>${Array.from(styles).join("\n")}</style>` : "",
    links,
    init2
  ].join("\n\n		");
  const body = options2.amp ? rendered.html : `${rendered.html}

			${serialized_data.map(({ url, body: body2, json }) => {
    let attributes = `type="application/json" data-type="svelte-data" data-url="${url}"`;
    if (body2)
      attributes += ` data-body="${hash(body2)}"`;
    return `<script ${attributes}>${json}<\/script>`;
  }).join("\n\n			")}
		`.replace(/^\t{2}/gm, "");
  const headers = {
    "content-type": "text/html"
  };
  if (maxage) {
    headers["cache-control"] = `${is_private ? "private" : "public"}, max-age=${maxage}`;
  }
  if (!options2.floc) {
    headers["permissions-policy"] = "interest-cohort=()";
  }
  return {
    status,
    headers,
    body: options2.template({ head, body })
  };
}
function try_serialize(data, fail) {
  try {
    return devalue(data);
  } catch (err) {
    if (fail)
      fail(err);
    return null;
  }
}
function serialize_error(error2) {
  if (!error2)
    return null;
  let serialized = try_serialize(error2);
  if (!serialized) {
    const { name, message, stack } = error2;
    serialized = try_serialize({ ...error2, name, message, stack });
  }
  if (!serialized) {
    serialized = "{}";
  }
  return serialized;
}
function normalize(loaded) {
  const has_error_status = loaded.status && loaded.status >= 400 && loaded.status <= 599 && !loaded.redirect;
  if (loaded.error || has_error_status) {
    const status = loaded.status;
    if (!loaded.error && has_error_status) {
      return {
        status,
        error: new Error()
      };
    }
    const error2 = typeof loaded.error === "string" ? new Error(loaded.error) : loaded.error;
    if (!(error2 instanceof Error)) {
      return {
        status: 500,
        error: new Error(`"error" property returned from load() must be a string or instance of Error, received type "${typeof error2}"`)
      };
    }
    if (!status || status < 400 || status > 599) {
      console.warn('"error" returned from load() without a valid status code \u2014 defaulting to 500');
      return { status: 500, error: error2 };
    }
    return { status, error: error2 };
  }
  if (loaded.redirect) {
    if (!loaded.status || Math.floor(loaded.status / 100) !== 3) {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be accompanied by a 3xx status code')
      };
    }
    if (typeof loaded.redirect !== "string") {
      return {
        status: 500,
        error: new Error('"redirect" property returned from load() must be a string')
      };
    }
  }
  return loaded;
}
function resolve(base, path2) {
  const baseparts = path2[0] === "/" ? [] : base.slice(1).split("/");
  const pathparts = path2[0] === "/" ? path2.slice(1).split("/") : path2.split("/");
  baseparts.pop();
  for (let i = 0; i < pathparts.length; i += 1) {
    const part = pathparts[i];
    if (part === ".")
      continue;
    else if (part === "..")
      baseparts.pop();
    else
      baseparts.push(part);
  }
  return `/${baseparts.join("/")}`;
}
var s = JSON.stringify;
var hasScheme = (url) => /^[a-zA-Z]+:/.test(url);
async function load_node({
  request,
  options: options2,
  state,
  route,
  page,
  node,
  $session,
  context,
  is_leaf,
  is_error,
  status,
  error: error2
}) {
  const { module: module2 } = node;
  let uses_credentials = false;
  const fetched = [];
  let loaded;
  if (module2.load) {
    const load_input = {
      page,
      get session() {
        uses_credentials = true;
        return $session;
      },
      fetch: async (resource, opts = {}) => {
        let url;
        if (typeof resource === "string") {
          url = resource;
        } else {
          url = resource.url;
          opts = {
            method: resource.method,
            headers: resource.headers,
            body: resource.body,
            mode: resource.mode,
            credentials: resource.credentials,
            cache: resource.cache,
            redirect: resource.redirect,
            referrer: resource.referrer,
            integrity: resource.integrity,
            ...opts
          };
        }
        if (options2.read && url.startsWith(options2.paths.assets)) {
          url = url.replace(options2.paths.assets, "");
        }
        if (url.startsWith("//")) {
          throw new Error(`Cannot request protocol-relative URL (${url}) in server-side fetch`);
        }
        let response;
        if (hasScheme(url)) {
          if (typeof request.host !== "undefined") {
            const { hostname: fetchHostname } = new URL(url);
            const [serverHostname] = request.host.split(":");
            if (`.${fetchHostname}`.endsWith(`.${serverHostname}`) && opts.credentials !== "omit") {
              uses_credentials = true;
              opts.headers = {
                ...opts.headers,
                cookie: request.headers.cookie
              };
            }
          }
          const externalRequest = new Request(url, opts);
          response = await options2.hooks.serverFetch.call(null, externalRequest);
        } else {
          const [path2, search] = url.split("?");
          const resolved = resolve(request.path, path2);
          const filename = resolved.slice(1);
          const filename_html = `${filename}/index.html`;
          const asset = options2.manifest.assets.find((d2) => d2.file === filename || d2.file === filename_html);
          if (asset) {
            if (options2.read) {
              response = new Response(options2.read(asset.file), {
                headers: {
                  "content-type": asset.type
                }
              });
            } else {
              response = await fetch(`http://${page.host}/${asset.file}`, opts);
            }
          }
          if (!response) {
            const headers = { ...opts.headers };
            if (opts.credentials !== "omit") {
              uses_credentials = true;
              headers.cookie = request.headers.cookie;
              if (!headers.authorization) {
                headers.authorization = request.headers.authorization;
              }
            }
            if (opts.body && typeof opts.body !== "string") {
              throw new Error("Request body must be a string");
            }
            const rendered = await respond({
              host: request.host,
              method: opts.method || "GET",
              headers,
              path: resolved,
              rawBody: opts.body,
              query: new URLSearchParams(search)
            }, options2, {
              fetched: url,
              initiator: route
            });
            if (rendered) {
              if (state.prerender) {
                state.prerender.dependencies.set(resolved, rendered);
              }
              response = new Response(rendered.body, {
                status: rendered.status,
                headers: rendered.headers
              });
            }
          }
        }
        if (response) {
          const proxy = new Proxy(response, {
            get(response2, key, receiver) {
              async function text() {
                const body = await response2.text();
                const headers = {};
                for (const [key2, value] of response2.headers) {
                  if (key2 !== "etag" && key2 !== "set-cookie")
                    headers[key2] = value;
                }
                if (!opts.body || typeof opts.body === "string") {
                  fetched.push({
                    url,
                    body: opts.body,
                    json: `{"status":${response2.status},"statusText":${s(response2.statusText)},"headers":${s(headers)},"body":${escape(body)}}`
                  });
                }
                return body;
              }
              if (key === "text") {
                return text;
              }
              if (key === "json") {
                return async () => {
                  return JSON.parse(await text());
                };
              }
              return Reflect.get(response2, key, response2);
            }
          });
          return proxy;
        }
        return response || new Response("Not found", {
          status: 404
        });
      },
      context: { ...context }
    };
    if (is_error) {
      load_input.status = status;
      load_input.error = error2;
    }
    loaded = await module2.load.call(null, load_input);
  } else {
    loaded = {};
  }
  if (!loaded && is_leaf && !is_error)
    return;
  return {
    node,
    loaded: normalize(loaded),
    context: loaded.context || context,
    fetched,
    uses_credentials
  };
}
var escaped = {
  "<": "\\u003C",
  ">": "\\u003E",
  "/": "\\u002F",
  "\\": "\\\\",
  "\b": "\\b",
  "\f": "\\f",
  "\n": "\\n",
  "\r": "\\r",
  "	": "\\t",
  "\0": "\\0",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
function escape(str) {
  let result = '"';
  for (let i = 0; i < str.length; i += 1) {
    const char = str.charAt(i);
    const code = char.charCodeAt(0);
    if (char === '"') {
      result += '\\"';
    } else if (char in escaped) {
      result += escaped[char];
    } else if (code >= 55296 && code <= 57343) {
      const next = str.charCodeAt(i + 1);
      if (code <= 56319 && next >= 56320 && next <= 57343) {
        result += char + str[++i];
      } else {
        result += `\\u${code.toString(16).toUpperCase()}`;
      }
    } else {
      result += char;
    }
  }
  result += '"';
  return result;
}
async function respond_with_error({ request, options: options2, state, $session, status, error: error2 }) {
  const default_layout = await options2.load_component(options2.manifest.layout);
  const default_error = await options2.load_component(options2.manifest.error);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params: {}
  };
  const loaded = await load_node({
    request,
    options: options2,
    state,
    route: null,
    page,
    node: default_layout,
    $session,
    context: {},
    is_leaf: false,
    is_error: false
  });
  const branch = [
    loaded,
    await load_node({
      request,
      options: options2,
      state,
      route: null,
      page,
      node: default_error,
      $session,
      context: loaded.context,
      is_leaf: false,
      is_error: true,
      status,
      error: error2
    })
  ];
  try {
    return await render_response({
      options: options2,
      $session,
      page_config: {
        hydrate: options2.hydrate,
        router: options2.router,
        ssr: options2.ssr
      },
      status,
      error: error2,
      branch,
      page
    });
  } catch (error3) {
    options2.handle_error(error3);
    return {
      status: 500,
      headers: {},
      body: error3.stack
    };
  }
}
async function respond$1({ request, options: options2, state, $session, route }) {
  const match = route.pattern.exec(request.path);
  const params = route.params(match);
  const page = {
    host: request.host,
    path: request.path,
    query: request.query,
    params
  };
  let nodes;
  try {
    nodes = await Promise.all(route.a.map((id) => id && options2.load_component(id)));
  } catch (error3) {
    options2.handle_error(error3);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
  const leaf = nodes[nodes.length - 1].module;
  const page_config = {
    ssr: "ssr" in leaf ? leaf.ssr : options2.ssr,
    router: "router" in leaf ? leaf.router : options2.router,
    hydrate: "hydrate" in leaf ? leaf.hydrate : options2.hydrate
  };
  if (!leaf.prerender && state.prerender && !state.prerender.all) {
    return {
      status: 204,
      headers: {},
      body: null
    };
  }
  let branch;
  let status = 200;
  let error2;
  ssr:
    if (page_config.ssr) {
      let context = {};
      branch = [];
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        let loaded;
        if (node) {
          try {
            loaded = await load_node({
              request,
              options: options2,
              state,
              route,
              page,
              node,
              $session,
              context,
              is_leaf: i === nodes.length - 1,
              is_error: false
            });
            if (!loaded)
              return;
            if (loaded.loaded.redirect) {
              return {
                status: loaded.loaded.status,
                headers: {
                  location: encodeURI(loaded.loaded.redirect)
                }
              };
            }
            if (loaded.loaded.error) {
              ({ status, error: error2 } = loaded.loaded);
            }
          } catch (e) {
            options2.handle_error(e);
            status = 500;
            error2 = e;
          }
          if (error2) {
            while (i--) {
              if (route.b[i]) {
                const error_node = await options2.load_component(route.b[i]);
                let error_loaded;
                let node_loaded;
                let j = i;
                while (!(node_loaded = branch[j])) {
                  j -= 1;
                }
                try {
                  error_loaded = await load_node({
                    request,
                    options: options2,
                    state,
                    route,
                    page,
                    node: error_node,
                    $session,
                    context: node_loaded.context,
                    is_leaf: false,
                    is_error: true,
                    status,
                    error: error2
                  });
                  if (error_loaded.loaded.error) {
                    continue;
                  }
                  branch = branch.slice(0, j + 1).concat(error_loaded);
                  break ssr;
                } catch (e) {
                  options2.handle_error(e);
                  continue;
                }
              }
            }
            return await respond_with_error({
              request,
              options: options2,
              state,
              $session,
              status,
              error: error2
            });
          }
        }
        branch.push(loaded);
        if (loaded && loaded.loaded.context) {
          context = {
            ...context,
            ...loaded.loaded.context
          };
        }
      }
    }
  try {
    return await render_response({
      options: options2,
      $session,
      page_config,
      status,
      error: error2,
      branch: branch && branch.filter(Boolean),
      page
    });
  } catch (error3) {
    options2.handle_error(error3);
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 500,
      error: error3
    });
  }
}
async function render_page(request, route, options2, state) {
  if (state.initiator === route) {
    return {
      status: 404,
      headers: {},
      body: `Not found: ${request.path}`
    };
  }
  const $session = await options2.hooks.getSession(request);
  if (route) {
    const response = await respond$1({
      request,
      options: options2,
      state,
      $session,
      route
    });
    if (response) {
      return response;
    }
    if (state.fetched) {
      return {
        status: 500,
        headers: {},
        body: `Bad request in load function: failed to fetch ${state.fetched}`
      };
    }
  } else {
    return await respond_with_error({
      request,
      options: options2,
      state,
      $session,
      status: 404,
      error: new Error(`Not found: ${request.path}`)
    });
  }
}
function lowercase_keys(obj) {
  const clone2 = {};
  for (const key in obj) {
    clone2[key.toLowerCase()] = obj[key];
  }
  return clone2;
}
function error(body) {
  return {
    status: 500,
    body,
    headers: {}
  };
}
function is_string(s2) {
  return typeof s2 === "string" || s2 instanceof String;
}
async function render_route(request, route) {
  const mod = await route.load();
  const handler2 = mod[request.method.toLowerCase().replace("delete", "del")];
  if (handler2) {
    const match = route.pattern.exec(request.path);
    const params = route.params(match);
    const response = await handler2({ ...request, params });
    const preface = `Invalid response from route ${request.path}`;
    if (response) {
      if (typeof response !== "object") {
        return error(`${preface}: expected an object, got ${typeof response}`);
      }
      let { status = 200, body, headers = {} } = response;
      headers = lowercase_keys(headers);
      const type = headers["content-type"];
      const is_type_textual = isContentTypeTextual(type);
      if (!is_type_textual && !(body instanceof Uint8Array || is_string(body))) {
        return error(`${preface}: body must be an instance of string or Uint8Array if content-type is not a supported textual content-type`);
      }
      let normalized_body;
      if ((typeof body === "object" || typeof body === "undefined") && !(body instanceof Uint8Array) && (!type || type.startsWith("application/json"))) {
        headers = { ...headers, "content-type": "application/json; charset=utf-8" };
        normalized_body = JSON.stringify(typeof body === "undefined" ? {} : body);
      } else {
        normalized_body = body;
      }
      return { status, body: normalized_body, headers };
    }
  }
}
function read_only_form_data() {
  const map = new Map();
  return {
    append(key, value) {
      if (map.has(key)) {
        map.get(key).push(value);
      } else {
        map.set(key, [value]);
      }
    },
    data: new ReadOnlyFormData(map)
  };
}
var ReadOnlyFormData = class {
  #map;
  constructor(map) {
    this.#map = map;
  }
  get(key) {
    const value = this.#map.get(key);
    return value && value[0];
  }
  getAll(key) {
    return this.#map.get(key);
  }
  has(key) {
    return this.#map.has(key);
  }
  *[Symbol.iterator]() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *entries() {
    for (const [key, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield [key, value[i]];
      }
    }
  }
  *keys() {
    for (const [key] of this.#map)
      yield key;
  }
  *values() {
    for (const [, value] of this.#map) {
      for (let i = 0; i < value.length; i += 1) {
        yield value[i];
      }
    }
  }
};
function parse_body(raw, headers) {
  if (!raw)
    return raw;
  if (typeof raw === "string") {
    const [type, ...directives] = headers["content-type"].split(/;\s*/);
    switch (type) {
      case "text/plain":
        return raw;
      case "application/json":
        return JSON.parse(raw);
      case "application/x-www-form-urlencoded":
        return get_urlencoded(raw);
      case "multipart/form-data": {
        const boundary = directives.find((directive) => directive.startsWith("boundary="));
        if (!boundary)
          throw new Error("Missing boundary");
        return get_multipart(raw, boundary.slice("boundary=".length));
      }
      default:
        throw new Error(`Invalid Content-Type ${type}`);
    }
  }
  return raw;
}
function get_urlencoded(text) {
  const { data, append } = read_only_form_data();
  text.replace(/\+/g, " ").split("&").forEach((str) => {
    const [key, value] = str.split("=");
    append(decodeURIComponent(key), decodeURIComponent(value));
  });
  return data;
}
function get_multipart(text, boundary) {
  const parts = text.split(`--${boundary}`);
  const nope = () => {
    throw new Error("Malformed form data");
  };
  if (parts[0] !== "" || parts[parts.length - 1].trim() !== "--") {
    nope();
  }
  const { data, append } = read_only_form_data();
  parts.slice(1, -1).forEach((part) => {
    const match = /\s*([\s\S]+?)\r\n\r\n([\s\S]*)\s*/.exec(part);
    const raw_headers = match[1];
    const body = match[2].trim();
    let key;
    raw_headers.split("\r\n").forEach((str) => {
      const [raw_header, ...raw_directives] = str.split("; ");
      let [name, value] = raw_header.split(": ");
      name = name.toLowerCase();
      const directives = {};
      raw_directives.forEach((raw_directive) => {
        const [name2, value2] = raw_directive.split("=");
        directives[name2] = JSON.parse(value2);
      });
      if (name === "content-disposition") {
        if (value !== "form-data")
          nope();
        if (directives.filename) {
          throw new Error("File upload is not yet implemented");
        }
        if (directives.name) {
          key = directives.name;
        }
      }
    });
    if (!key)
      nope();
    append(key, body);
  });
  return data;
}
async function respond(incoming, options2, state = {}) {
  if (incoming.path !== "/" && options2.trailing_slash !== "ignore") {
    const has_trailing_slash = incoming.path.endsWith("/");
    if (has_trailing_slash && options2.trailing_slash === "never" || !has_trailing_slash && options2.trailing_slash === "always" && !incoming.path.split("/").pop().includes(".")) {
      const path2 = has_trailing_slash ? incoming.path.slice(0, -1) : incoming.path + "/";
      const q = incoming.query.toString();
      return {
        status: 301,
        headers: {
          location: encodeURI(path2 + (q ? `?${q}` : ""))
        }
      };
    }
  }
  try {
    const headers = lowercase_keys(incoming.headers);
    return await options2.hooks.handle({
      request: {
        ...incoming,
        headers,
        body: parse_body(incoming.rawBody, headers),
        params: null,
        locals: {}
      },
      resolve: async (request) => {
        if (state.prerender && state.prerender.fallback) {
          return await render_response({
            options: options2,
            $session: await options2.hooks.getSession(request),
            page_config: { ssr: false, router: true, hydrate: true },
            status: 200,
            error: null,
            branch: [],
            page: null
          });
        }
        for (const route of options2.manifest.routes) {
          if (!route.pattern.test(request.path))
            continue;
          const response = route.type === "endpoint" ? await render_route(request, route) : await render_page(request, route, options2, state);
          if (response) {
            if (response.status === 200) {
              if (!/(no-store|immutable)/.test(response.headers["cache-control"])) {
                const etag = `"${hash(response.body)}"`;
                if (request.headers["if-none-match"] === etag) {
                  return {
                    status: 304,
                    headers: {},
                    body: null
                  };
                }
                response.headers["etag"] = etag;
              }
            }
            return response;
          }
        }
        return await render_page(request, null, options2, state);
      }
    });
  } catch (e) {
    options2.handle_error(e);
    return {
      status: 500,
      headers: {},
      body: options2.dev ? e.stack : e.message
    };
  }
}

// .svelte-kit/output/server/app.js
var import_fs = __toModule(require("fs"));
var import_path = __toModule(require("path"));
var import_marked = __toModule(require_marked());
var import_gray_matter = __toModule(require_gray_matter());
var import_prismjs = __toModule(require_prism());
function run(fn) {
  return fn();
}
function blank_object() {
  return Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function null_to_empty(value) {
  return value == null ? "" : value;
}
var current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component)
    throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function afterUpdate(fn) {
  get_current_component().$$.after_update.push(fn);
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
}
Promise.resolve();
var escaped2 = {
  '"': "&quot;",
  "'": "&#39;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function escape2(html) {
  return String(html).replace(/["'&<>]/g, (match) => escaped2[match]);
}
function each(items, fn) {
  let str = "";
  for (let i = 0; i < items.length; i += 1) {
    str += fn(items[i], i);
  }
  return str;
}
var missing_component = {
  $$render: () => ""
};
function validate_component(component, name) {
  if (!component || !component.$$render) {
    if (name === "svelte:component")
      name += " this={...}";
    throw new Error(`<${name}> is not a valid SSR component. You may need to review your build config to ensure that dependencies are compiled, rather than imported as pre-compiled modules`);
  }
  return component;
}
var on_destroy;
function create_ssr_component(fn) {
  function $$render(result, props, bindings, slots, context) {
    const parent_component = current_component;
    const $$ = {
      on_destroy,
      context: new Map(parent_component ? parent_component.$$.context : context || []),
      on_mount: [],
      before_update: [],
      after_update: [],
      callbacks: blank_object()
    };
    set_current_component({ $$ });
    const html = fn(result, props, bindings, slots);
    set_current_component(parent_component);
    return html;
  }
  return {
    render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
      on_destroy = [];
      const result = { title: "", head: "", css: new Set() };
      const html = $$render(result, props, {}, $$slots, context);
      run_all(on_destroy);
      return {
        html,
        css: {
          code: Array.from(result.css).map((css2) => css2.code).join("\n"),
          map: null
        },
        head: result.title + result.head
      };
    },
    $$render
  };
}
function add_attribute(name, value, boolean) {
  if (value == null || boolean && !value)
    return "";
  return ` ${name}${value === true ? "" : `=${typeof value === "string" ? JSON.stringify(escape2(value)) : `"${value}"`}`}`;
}
var css$5 = {
  code: "#svelte-announcer.svelte-1j55zn5{position:absolute;left:0;top:0;clip:rect(0 0 0 0);clip-path:inset(50%);overflow:hidden;white-space:nowrap;width:1px;height:1px}",
  map: `{"version":3,"file":"root.svelte","sources":["root.svelte"],"sourcesContent":["<!-- This file is generated by @sveltejs/kit \u2014 do not edit it! -->\\n<script>\\n\\timport { setContext, afterUpdate, onMount } from 'svelte';\\n\\n\\t// stores\\n\\texport let stores;\\n\\texport let page;\\n\\n\\texport let components;\\n\\texport let props_0 = null;\\n\\texport let props_1 = null;\\n\\texport let props_2 = null;\\n\\n\\tsetContext('__svelte__', stores);\\n\\n\\t$: stores.page.set(page);\\n\\tafterUpdate(stores.page.notify);\\n\\n\\tlet mounted = false;\\n\\tlet navigated = false;\\n\\tlet title = null;\\n\\n\\tonMount(() => {\\n\\t\\tconst unsubscribe = stores.page.subscribe(() => {\\n\\t\\t\\tif (mounted) {\\n\\t\\t\\t\\tnavigated = true;\\n\\t\\t\\t\\ttitle = document.title || 'untitled page';\\n\\t\\t\\t}\\n\\t\\t});\\n\\n\\t\\tmounted = true;\\n\\t\\treturn unsubscribe;\\n\\t});\\n<\/script>\\n\\n<svelte:component this={components[0]} {...(props_0 || {})}>\\n\\t{#if components[1]}\\n\\t\\t<svelte:component this={components[1]} {...(props_1 || {})}>\\n\\t\\t\\t{#if components[2]}\\n\\t\\t\\t\\t<svelte:component this={components[2]} {...(props_2 || {})}/>\\n\\t\\t\\t{/if}\\n\\t\\t</svelte:component>\\n\\t{/if}\\n</svelte:component>\\n\\n{#if mounted}\\n\\t<div id=\\"svelte-announcer\\" aria-live=\\"assertive\\" aria-atomic=\\"true\\">\\n\\t\\t{#if navigated}\\n\\t\\t\\t{title}\\n\\t\\t{/if}\\n\\t</div>\\n{/if}\\n\\n<style>\\n\\t#svelte-announcer {\\n\\t\\tposition: absolute;\\n\\t\\tleft: 0;\\n\\t\\ttop: 0;\\n\\t\\tclip: rect(0 0 0 0);\\n\\t\\tclip-path: inset(50%);\\n\\t\\toverflow: hidden;\\n\\t\\twhite-space: nowrap;\\n\\t\\twidth: 1px;\\n\\t\\theight: 1px;\\n\\t}\\n</style>"],"names":[],"mappings":"AAsDC,iBAAiB,eAAC,CAAC,AAClB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CACnB,SAAS,CAAE,MAAM,GAAG,CAAC,CACrB,QAAQ,CAAE,MAAM,CAChB,WAAW,CAAE,MAAM,CACnB,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,AACZ,CAAC"}`
};
var Root = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { stores } = $$props;
  let { page } = $$props;
  let { components } = $$props;
  let { props_0 = null } = $$props;
  let { props_1 = null } = $$props;
  let { props_2 = null } = $$props;
  setContext("__svelte__", stores);
  afterUpdate(stores.page.notify);
  let mounted = false;
  let navigated = false;
  let title = null;
  onMount(() => {
    const unsubscribe = stores.page.subscribe(() => {
      if (mounted) {
        navigated = true;
        title = document.title || "untitled page";
      }
    });
    mounted = true;
    return unsubscribe;
  });
  if ($$props.stores === void 0 && $$bindings.stores && stores !== void 0)
    $$bindings.stores(stores);
  if ($$props.page === void 0 && $$bindings.page && page !== void 0)
    $$bindings.page(page);
  if ($$props.components === void 0 && $$bindings.components && components !== void 0)
    $$bindings.components(components);
  if ($$props.props_0 === void 0 && $$bindings.props_0 && props_0 !== void 0)
    $$bindings.props_0(props_0);
  if ($$props.props_1 === void 0 && $$bindings.props_1 && props_1 !== void 0)
    $$bindings.props_1(props_1);
  if ($$props.props_2 === void 0 && $$bindings.props_2 && props_2 !== void 0)
    $$bindings.props_2(props_2);
  $$result.css.add(css$5);
  {
    stores.page.set(page);
  }
  return `


${validate_component(components[0] || missing_component, "svelte:component").$$render($$result, Object.assign(props_0 || {}), {}, {
    default: () => `${components[1] ? `${validate_component(components[1] || missing_component, "svelte:component").$$render($$result, Object.assign(props_1 || {}), {}, {
      default: () => `${components[2] ? `${validate_component(components[2] || missing_component, "svelte:component").$$render($$result, Object.assign(props_2 || {}), {}, {})}` : ``}`
    })}` : ``}`
  })}

${mounted ? `<div id="${"svelte-announcer"}" aria-live="${"assertive"}" aria-atomic="${"true"}" class="${"svelte-1j55zn5"}">${navigated ? `${escape2(title)}` : ``}</div>` : ``}`;
});
function set_paths(paths) {
}
function set_prerendering(value) {
}
var user_hooks = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module"
});
var template = ({ head, body }) => '<!DOCTYPE html>\r\n<html lang="en">\r\n  <head>\r\n    <meta charset="utf-8" />\r\n    <meta\r\n      name="viewport"\r\n      content="width=device-width,initial-scale=1, shrink-to-fit=no"\r\n    />\r\n    <meta name="theme-color" content="#e00000" />\r\n    <meta name="msapplication-TileColor" content="#ffc40d" />\r\n\r\n    <!-- Primary Meta Tags -->\r\n    <title>Console Logs</title>\r\n    <meta name="title" content="Console Logs" />\r\n    <meta\r\n      name="description"\r\n      content="A site for all my bytes of programming related knowledge."\r\n    />\r\n\r\n    <!-- Open Graph / Facebook -->\r\n    <meta property="og:type" content="website" />\r\n    <meta property="og:url" content="https://console-logs.netlify.app/og.png" />\r\n    <meta property="og:title" content="Console Logs" />\r\n    <meta\r\n      property="og:description"\r\n      content="A site for all my bytes of programming related knowledge."\r\n    />\r\n    <meta\r\n      property="og:image"\r\n      content="https://console-logs.netlify.app/og.png"\r\n    />\r\n\r\n    <!-- Twitter -->\r\n    <meta property="twitter:card" content="summary_large_image" />\r\n    <meta\r\n      property="twitter:url"\r\n      content="https://console-logs.netlify.app/og.png"\r\n    />\r\n    <meta property="twitter:title" content="Console Logs" />\r\n    <meta\r\n      property="twitter:description"\r\n      content="A site for all my bytes of programming related knowledge."\r\n    />\r\n    <meta\r\n      property="twitter:image"\r\n      content="https://console-logs.netlify.app/og.png"\r\n    />\r\n    <meta name="twitter:image:alt" content="Console dot Logs Logo" />\r\n    <link rel="stylesheet" href="global.css" />\r\n    <link rel="stylesheet" href="prism.css" />\r\n    <link rel="manifest" href="manifest.json" />\r\n    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />\r\n    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />\r\n    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />\r\n    <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#333333" />\r\n    ' + head + '\r\n  </head>\r\n\r\n  <body>\r\n    <div id="svelte">' + body + '</div>\r\n\r\n    <script src="prismjs.js"><\/script>\r\n  </body>\r\n</html>\r\n';
var options = null;
var default_settings = { paths: { "base": "", "assets": "/." } };
function init(settings = default_settings) {
  set_paths(settings.paths);
  set_prerendering(settings.prerendering || false);
  options = {
    amp: false,
    dev: false,
    entry: {
      file: "/./_app/start-4b1506ef.js",
      css: ["/./_app/assets/start-a8cd1609.css"],
      js: ["/./_app/start-4b1506ef.js", "/./_app/chunks/vendor-e81d31f1.js"]
    },
    fetched: void 0,
    floc: false,
    get_component_path: (id) => "/./_app/" + entry_lookup[id],
    get_stack: (error2) => String(error2),
    handle_error: (error2) => {
      if (error2.frame) {
        console.error(error2.frame);
      }
      console.error(error2.stack);
      error2.stack = options.get_stack(error2);
    },
    hooks: get_hooks(user_hooks),
    hydrate: true,
    initiator: void 0,
    load_component,
    manifest,
    paths: settings.paths,
    read: settings.read,
    root: Root,
    service_worker: null,
    router: true,
    ssr: true,
    target: "#svelte",
    template,
    trailing_slash: "never"
  };
}
var d = decodeURIComponent;
var empty = () => ({});
var manifest = {
  assets: [{ "file": "Advanced_Javascript.png", "size": 621671, "type": "image/png" }, { "file": "Octocat.png", "size": 32590, "type": "image/png" }, { "file": "android-chrome-192x192.png", "size": 9295, "type": "image/png" }, { "file": "android-chrome-512x512.png", "size": 13815, "type": "image/png" }, { "file": "apple-touch-icon.png", "size": 7797, "type": "image/png" }, { "file": "atomic-design/atomic-design.png", "size": 32753, "type": "image/png" }, { "file": "atomic-design/atoms.png", "size": 71376, "type": "image/png" }, { "file": "atomic-design/auto-layout.png", "size": 19865, "type": "image/png" }, { "file": "atomic-design/designSystemChecklist.png", "size": 18145, "type": "image/png" }, { "file": "atomic-design/pages.png", "size": 20887, "type": "image/png" }, { "file": "bdesigned.svg", "size": 3233, "type": "image/svg+xml" }, { "file": "big-o.jpg", "size": 746099, "type": "image/jpeg" }, { "file": "bit.png", "size": 2234, "type": "image/png" }, { "file": "browserconfig.xml", "size": 255, "type": "application/xml" }, { "file": "css-podcast/banner.png", "size": 811949, "type": "image/png" }, { "file": "css-podcast/gallery.svg", "size": 34648, "type": "image/svg+xml" }, { "file": "css-podcast/skeletor.gif", "size": 3970542, "type": "image/gif" }, { "file": "css-podcast/specificity.jpg", "size": 114879, "type": "image/jpeg" }, { "file": "css-podcast/una_doodle.png", "size": 268124, "type": "image/png" }, { "file": "data.png", "size": 38191, "type": "image/png" }, { "file": "deno/Deno.jpg", "size": 278712, "type": "image/jpeg" }, { "file": "deno/deno.gif", "size": 856068, "type": "image/gif" }, { "file": "deno/deno.svg", "size": 6357, "type": "image/svg+xml" }, { "file": "dun.png", "size": 146989, "type": "image/png" }, { "file": "favicon-16x16.png", "size": 470, "type": "image/png" }, { "file": "favicon-32x32.png", "size": 1007, "type": "image/png" }, { "file": "favicon.ico", "size": 15406, "type": "image/vnd.microsoft.icon" }, { "file": "fonts/SpaceMono-Regular.ttf", "size": 93252, "type": "font/ttf" }, { "file": "fonts/WorkSans-Regular.ttf", "size": 135828, "type": "font/ttf" }, { "file": "g/dev.png", "size": 138576, "type": "image/png" }, { "file": "g/favicon.png", "size": 58392, "type": "image/png" }, { "file": "g/octocat.png", "size": 35754, "type": "image/png" }, { "file": "g/sun.png", "size": 7905, "type": "image/png" }, { "file": "git-cheat-sheet.png", "size": 286887, "type": "image/png" }, { "file": "git_areas.png", "size": 22255, "type": "image/png" }, { "file": "gitcheatsheet.png", "size": 295491, "type": "image/png" }, { "file": "github.svg", "size": 1582, "type": "image/svg+xml" }, { "file": "global.css", "size": 2307, "type": "text/css" }, { "file": "gql/page1.png", "size": 11684, "type": "image/png" }, { "file": "great-success.png", "size": 81921, "type": "image/png" }, { "file": "imperative_code.png", "size": 99344, "type": "image/png" }, { "file": "in.svg", "size": 902, "type": "image/svg+xml" }, { "file": "javascript_engine.png", "size": 282043, "type": "image/png" }, { "file": "jr2sr/crp.png", "size": 22140, "type": "image/png" }, { "file": "jr2sr/encryption.gif", "size": 224366, "type": "image/gif" }, { "file": "jr2sr/error-webpack.png", "size": 164243, "type": "image/png" }, { "file": "jr2sr/images.png", "size": 740364, "type": "image/png" }, { "file": "jr2sr/performance.png", "size": 943445, "type": "image/png" }, { "file": "jr2sr/roadmap.png", "size": 722454, "type": "image/png" }, { "file": "jr2sr/ssh.png", "size": 227887, "type": "image/png" }, { "file": "jr2sr/webpack.png", "size": 16690, "type": "image/png" }, { "file": "languages.png", "size": 148725, "type": "image/png" }, { "file": "logo-192.png", "size": 4760, "type": "image/png" }, { "file": "logo-512.png", "size": 13928, "type": "image/png" }, { "file": "logo.svg", "size": 10253, "type": "image/svg+xml" }, { "file": "logos/atoms.svg", "size": 386, "type": "image/svg+xml" }, { "file": "logos/css-podcast.png", "size": 14162, "type": "image/png" }, { "file": "logos/css.svg", "size": 960, "type": "image/svg+xml" }, { "file": "logos/deno.svg", "size": 6047, "type": "image/svg+xml" }, { "file": "logos/git.svg", "size": 896, "type": "image/svg+xml" }, { "file": "logos/gql.svg", "size": 2505, "type": "image/svg+xml" }, { "file": "logos/html.svg", "size": 1021, "type": "image/svg+xml" }, { "file": "logos/js.svg", "size": 1066, "type": "image/svg+xml" }, { "file": "logos/md.svg", "size": 680, "type": "image/svg+xml" }, { "file": "logos/next.svg", "size": 3386, "type": "image/svg+xml" }, { "file": "logos/open-source-logo.png", "size": 8612, "type": "image/png" }, { "file": "logos/python.svg", "size": 1313, "type": "image/svg+xml" }, { "file": "logos/react.svg", "size": 2624, "type": "image/svg+xml" }, { "file": "logos/redux.svg", "size": 1776, "type": "image/svg+xml" }, { "file": "logos/sheets.png", "size": 7961, "type": "image/png" }, { "file": "logos/uiux.svg", "size": 25077, "type": "image/svg+xml" }, { "file": "logos/uiuxfull.svg", "size": 25069, "type": "image/svg+xml" }, { "file": "logos/vscode.svg", "size": 329, "type": "image/svg+xml" }, { "file": "manifest.json", "size": 424, "type": "application/json" }, { "file": "mark_and_sweep.gif", "size": 147344, "type": "image/gif" }, { "file": "me.png", "size": 97159, "type": "image/png" }, { "file": "memory-stack.png", "size": 9814, "type": "image/png" }, { "file": "moon.png", "size": 2371, "type": "image/png" }, { "file": "mstile-150x150.png", "size": 8293, "type": "image/png" }, { "file": "node_js.png", "size": 32086, "type": "image/png" }, { "file": "og.png", "size": 19082, "type": "image/png" }, { "file": "pollute.gif", "size": 3816686, "type": "image/gif" }, { "file": "prism.css", "size": 6954, "type": "text/css" }, { "file": "prismjs.js", "size": 111158, "type": "application/javascript" }, { "file": "prototype_chain.png", "size": 780150, "type": "image/png" }, { "file": "python.png", "size": 83564, "type": "image/png" }, { "file": "react/Redux-flow.webp", "size": 11658, "type": "image/webp" }, { "file": "react/class-methods.svg", "size": 43776, "type": "image/svg+xml" }, { "file": "react/components.svg", "size": 20200, "type": "image/svg+xml" }, { "file": "react/dom-tree.svg", "size": 35593, "type": "image/svg+xml" }, { "file": "react/folders.png", "size": 15398, "type": "image/png" }, { "file": "react/lifecycle-methods.png", "size": 35517, "type": "image/png" }, { "file": "react/lifecycle.png", "size": 30517, "type": "image/png" }, { "file": "react/react-native.png", "size": 119502, "type": "image/png" }, { "file": "react/react.svg", "size": 1549, "type": "image/svg+xml" }, { "file": "react/redux.svg", "size": 1121, "type": "image/svg+xml" }, { "file": "react-3d/threejs-1cube-no-light-scene.svg", "size": 46204, "type": "image/svg+xml" }, { "file": "react-3d/threejs-structure.svg", "size": 123539, "type": "image/svg+xml" }, { "file": "recursion.png", "size": 14162, "type": "image/png" }, { "file": "resources.pdf", "size": 218913, "type": "application/pdf" }, { "file": "rtk/logo.png", "size": 33106, "type": "image/png" }, { "file": "rwd/fill-fit.jpg", "size": 90720, "type": "image/jpeg" }, { "file": "rwd/quote.jpg", "size": 156411, "type": "image/jpeg" }, { "file": "safari-pinned-tab.svg", "size": 9252, "type": "image/svg+xml" }, { "file": "sapper.png", "size": 3362, "type": "image/png" }, { "file": "scope_chain.png", "size": 185977, "type": "image/png" }, { "file": "scope_graph.png", "size": 669352, "type": "image/png" }, { "file": "site.webmanifest", "size": 263, "type": "application/manifest+json" }, { "file": "structure_tree.png", "size": 10829, "type": "image/png" }, { "file": "sun.png", "size": 11245, "type": "image/png" }, { "file": "svelte-logo-horizontal.svg", "size": 2735, "type": "image/svg+xml" }, { "file": "svelte-logo.png", "size": 9346, "type": "image/png" }, { "file": "svelte.png", "size": 14044, "type": "image/png" }, { "file": "twitter.svg", "size": 1115, "type": "image/svg+xml" }, { "file": "uiux/SPA Portfolio.html", "size": 7942, "type": "text/html" }, { "file": "uiux/SPA Portfolio_files/bolt.png", "size": 869, "type": "image/png" }, { "file": "uiux/SPA Portfolio_files/laptop.png", "size": 928, "type": "image/png" }, { "file": "uiux/SPA Portfolio_files/marketing.png", "size": 1487, "type": "image/png" }, { "file": "uiux/SPA Portfolio_files/responsive.png", "size": 26130, "type": "image/png" }, { "file": "uiux/SPA Portfolio_files/styles.css", "size": 1560, "type": "text/css" }, { "file": "uiux/contrast.png", "size": 113040, "type": "image/png" }, { "file": "uiux/flow.jpg", "size": 1991270, "type": "image/jpeg" }, { "file": "uiux/flow.png", "size": 145459, "type": "image/png" }, { "file": "uiux/fonts.png", "size": 96976, "type": "image/png" }, { "file": "uiux/ratio.png", "size": 36692, "type": "image/png" }, { "file": "uiux/sans-serif.png", "size": 45650, "type": "image/png" }, { "file": "uiux/serif.png", "size": 47340, "type": "image/png" }, { "file": "uiux/sitemap.jpg", "size": 2465370, "type": "image/jpeg" }, { "file": "uiux/sketching.png", "size": 126013, "type": "image/png" }, { "file": "uiux/states.jpg", "size": 2674845, "type": "image/jpeg" }, { "file": "uiux/typescale.png", "size": 270700, "type": "image/png" }, { "file": "uiux/user-flow.png", "size": 140680, "type": "image/png" }, { "file": "values.svg", "size": 355304, "type": "image/svg+xml" }, { "file": "vscode-theme/header.png", "size": 43429, "type": "image/png" }, { "file": "vscode-theme/inspect.png", "size": 19167, "type": "image/png" }, { "file": "vscode-theme/json1.png", "size": 87100, "type": "image/png" }, { "file": "vscode-theme/search.png", "size": 5136, "type": "image/png" }, { "file": "vscode-theme/token1.png", "size": 161152, "type": "image/png" }, { "file": "vscode-theme/token2.png", "size": 130960, "type": "image/png" }, { "file": "vscode-theme/token3.png", "size": 185867, "type": "image/png" }, { "file": "vscode-theme/token4.png", "size": 174358, "type": "image/png" }, { "file": "youtube.svg", "size": 802, "type": "image/svg+xml" }],
  layout: "src/routes/__layout.svelte",
  error: "src/routes/__error.svelte",
  routes: [
    {
      type: "page",
      pattern: /^\/$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/logs\.json$/,
      params: empty,
      load: () => Promise.resolve().then(function() {
        return index_json;
      })
    },
    {
      type: "page",
      pattern: /^\/logs\/?$/,
      params: empty,
      a: ["src/routes/__layout.svelte", "src/routes/logs/index.svelte"],
      b: ["src/routes/__error.svelte"]
    },
    {
      type: "endpoint",
      pattern: /^\/logs\/([^/]+?)\.json$/,
      params: (m) => ({ slug: d(m[1]) }),
      load: () => Promise.resolve().then(function() {
        return _slug__json;
      })
    },
    {
      type: "page",
      pattern: /^\/logs\/([^/]+?)\/?$/,
      params: (m) => ({ slug: d(m[1]) }),
      a: ["src/routes/__layout.svelte", "src/routes/logs/[slug].svelte"],
      b: ["src/routes/__error.svelte"]
    }
  ]
};
var get_hooks = (hooks) => ({
  getSession: hooks.getSession || (() => ({})),
  handle: hooks.handle || (({ request, resolve: resolve2 }) => resolve2(request)),
  serverFetch: hooks.serverFetch || fetch
});
var module_lookup = {
  "src/routes/__layout.svelte": () => Promise.resolve().then(function() {
    return __layout;
  }),
  "src/routes/__error.svelte": () => Promise.resolve().then(function() {
    return __error;
  }),
  "src/routes/index.svelte": () => Promise.resolve().then(function() {
    return index$1;
  }),
  "src/routes/logs/index.svelte": () => Promise.resolve().then(function() {
    return index;
  }),
  "src/routes/logs/[slug].svelte": () => Promise.resolve().then(function() {
    return _slug_;
  })
};
var metadata_lookup = { "src/routes/__layout.svelte": { "entry": "/./_app/pages/__layout.svelte-c40fd473.js", "css": ["/./_app/assets/pages/__layout.svelte-48428b46.css"], "js": ["/./_app/pages/__layout.svelte-c40fd473.js", "/./_app/chunks/vendor-e81d31f1.js"], "styles": null }, "src/routes/__error.svelte": { "entry": "/./_app/pages/__error.svelte-bcc86294.js", "css": [], "js": ["/./_app/pages/__error.svelte-bcc86294.js", "/./_app/chunks/vendor-e81d31f1.js"], "styles": null }, "src/routes/index.svelte": { "entry": "/./_app/pages/index.svelte-08847188.js", "css": ["/./_app/assets/pages/index.svelte-7a765449.css"], "js": ["/./_app/pages/index.svelte-08847188.js", "/./_app/chunks/vendor-e81d31f1.js"], "styles": null }, "src/routes/logs/index.svelte": { "entry": "/./_app/pages/logs/index.svelte-0c978ddc.js", "css": ["/./_app/assets/pages/logs/index.svelte-661ca756.css"], "js": ["/./_app/pages/logs/index.svelte-0c978ddc.js", "/./_app/chunks/vendor-e81d31f1.js"], "styles": null }, "src/routes/logs/[slug].svelte": { "entry": "/./_app/pages/logs/[slug].svelte-aadc58e8.js", "css": ["/./_app/assets/pages/logs/[slug].svelte-5a067698.css"], "js": ["/./_app/pages/logs/[slug].svelte-aadc58e8.js", "/./_app/chunks/vendor-e81d31f1.js"], "styles": null } };
async function load_component(file) {
  return {
    module: await module_lookup[file](),
    ...metadata_lookup[file]
  };
}
function render(request, {
  prerender
} = {}) {
  const host = request.headers["host"];
  return respond({ ...request, host }, options, { prerender });
}
function getAllPosts(filesPath) {
  const data = import_fs.default.readdirSync(filesPath).map((fileName) => {
    const post = import_fs.default.readFileSync(import_path.default.resolve(filesPath, fileName), "utf-8");
    const { data: data2, content } = (0, import_gray_matter.default)(post);
    const renderer = new import_marked.default.Renderer();
    const html = (0, import_marked.default)(content, { renderer });
    return {
      html,
      slug: fileName.substring(0, fileName.length - 3),
      ...data2
    };
  });
  return data;
}
function get$1(req, res) {
  const posts = getAllPosts("src/posts");
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  res.end(JSON.stringify(posts));
}
var index_json = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get: get$1
});
!function(i) {
  var t = i.util.clone(i.languages.javascript), e = "(?:\\{<S>*\\.{3}(?:[^{}]|<BRACES>)*\\})";
  function n(t2, n2) {
    return t2 = t2.replace(/<S>/g, function() {
      return "(?:\\s|//.*(?!.)|/\\*(?:[^*]|\\*(?!/))\\*/)";
    }).replace(/<BRACES>/g, function() {
      return "(?:\\{(?:\\{(?:\\{[^{}]*\\}|[^{}])*\\}|[^{}])*\\})";
    }).replace(/<SPREAD>/g, function() {
      return e;
    }), RegExp(t2, n2);
  }
  e = n(e).source, i.languages.jsx = i.languages.extend("markup", t), i.languages.jsx.tag.pattern = n(`</?(?:[\\w.:-]+(?:<S>+(?:[\\w.:$-]+(?:=(?:"(?:\\\\[^]|[^\\\\"])*"|'(?:\\\\[^]|[^\\\\'])*'|[^\\s{'"/>=]+|<BRACES>))?|<SPREAD>))*<S>*/?)?>`), i.languages.jsx.tag.inside.tag.pattern = /^<\/?[^\s>\/]*/i, i.languages.jsx.tag.inside["attr-value"].pattern = /=(?!\{)(?:"(?:\\[\s\S]|[^\\"])*"|'(?:\\[\s\S]|[^\\'])*'|[^\s'">]+)/i, i.languages.jsx.tag.inside.tag.inside["class-name"] = /^[A-Z]\w*(?:\.[A-Z]\w*)*$/, i.languages.jsx.tag.inside.comment = t.comment, i.languages.insertBefore("inside", "attr-name", { spread: { pattern: n("<SPREAD>"), inside: i.languages.jsx } }, i.languages.jsx.tag), i.languages.insertBefore("inside", "special-attr", { script: { pattern: n("=<BRACES>"), inside: { "script-punctuation": { pattern: /^=(?=\{)/, alias: "punctuation" }, rest: i.languages.jsx }, alias: "language-javascript" } }, i.languages.jsx.tag);
  var o = function(t2) {
    return t2 ? typeof t2 == "string" ? t2 : typeof t2.content == "string" ? t2.content : t2.content.map(o).join("") : "";
  }, r = function(t2) {
    for (var n2 = [], e2 = 0; e2 < t2.length; e2++) {
      var a = t2[e2], s2 = false;
      if (typeof a != "string" && (a.type === "tag" && a.content[0] && a.content[0].type === "tag" ? a.content[0].content[0].content === "</" ? 0 < n2.length && n2[n2.length - 1].tagName === o(a.content[0].content[1]) && n2.pop() : a.content[a.content.length - 1].content === "/>" || n2.push({ tagName: o(a.content[0].content[1]), openedBraces: 0 }) : 0 < n2.length && a.type === "punctuation" && a.content === "{" ? n2[n2.length - 1].openedBraces++ : 0 < n2.length && 0 < n2[n2.length - 1].openedBraces && a.type === "punctuation" && a.content === "}" ? n2[n2.length - 1].openedBraces-- : s2 = true), (s2 || typeof a == "string") && 0 < n2.length && n2[n2.length - 1].openedBraces === 0) {
        var g = o(a);
        e2 < t2.length - 1 && (typeof t2[e2 + 1] == "string" || t2[e2 + 1].type === "plain-text") && (g += o(t2[e2 + 1]), t2.splice(e2 + 1, 1)), 0 < e2 && (typeof t2[e2 - 1] == "string" || t2[e2 - 1].type === "plain-text") && (g = o(t2[e2 - 1]) + g, t2.splice(e2 - 1, 1), e2--), t2[e2] = new i.Token("plain-text", g, null, g);
      }
      a.content && typeof a.content != "string" && r(a.content);
    }
  };
  i.hooks.add("after-tokenize", function(t2) {
    t2.language !== "jsx" && t2.language !== "tsx" || r(t2.tokens);
  });
}(Prism);
function get(req, res, next) {
  const { slug } = req.params;
  res.writeHead(200, {
    "Content-Type": "application/json"
  });
  const post = import_fs.default.readFileSync(import_path.default.resolve("src/posts", `${slug}.md`), "utf-8");
  const { data, content } = (0, import_gray_matter.default)(post);
  const renderer = new import_marked.default.Renderer();
  renderer.code = (code, language) => {
    const parser = import_prismjs.default.languages[language] || import_prismjs.default.languages.html;
    const highlighted = import_prismjs.default.highlight(code, parser, language);
    return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`;
  };
  const html = (0, import_marked.default)(content, { renderer });
  res.end(JSON.stringify({
    html,
    ...data
  }));
}
var _slug__json = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  get
});
var css$4 = {
  code: "nav.svelte-38d2ez.svelte-38d2ez{background:var(--nav-color);border-bottom:1px solid rgb(155, 50, 43)}.wrapper.svelte-38d2ez.svelte-38d2ez{font-weight:700;padding:1rem 0;display:flex;justify-content:space-between;max-width:var(--max-width);margin:0 auto;width:100%}.links.svelte-38d2ez.svelte-38d2ez{display:flex;align-items:center}.a-logo.svelte-38d2ez.svelte-38d2ez{margin:0;padding:0}.a-logo.svelte-38d2ez.svelte-38d2ez::before{background:transparent}.logo.svelte-38d2ez.svelte-38d2ez{width:50px;transition:all 0.2s linear;cursor:pointer}.logo.svelte-38d2ez.svelte-38d2ez:hover{transform:scale(1.2)}.nav-links.svelte-38d2ez.svelte-38d2ez{display:flex}a.svelte-38d2ez.svelte-38d2ez{color:#424242;text-decoration:none;padding:1em;display:block;position:relative}a.svelte-38d2ez.svelte-38d2ez::before{content:'';position:absolute;transition:transform 0.3s ease;left:12%;bottom:0;top:40px;width:75%;height:2px;background:#aaa;transform:scaleX(0)}a.svelte-38d2ez.svelte-38d2ez:hover::before,.selected.svelte-38d2ez.svelte-38d2ez::before{transform:scaleX(1)}.selected.svelte-38d2ez.svelte-38d2ez::before{background:rgb(155, 50, 43)}.dev.svelte-38d2ez.svelte-38d2ez::before{background:transparent}.dev.svelte-38d2ez.svelte-38d2ez:hover::before{background:transparent}.slider-img.svelte-38d2ez.svelte-38d2ez{width:30px;height:30px}.theme-switch-wrapper.svelte-38d2ez.svelte-38d2ez{display:flex;align-items:center}.theme-switch.svelte-38d2ez.svelte-38d2ez{display:inline-block;height:34px;position:relative;width:60px}.theme-switch.svelte-38d2ez input.svelte-38d2ez{display:none}.slider.svelte-38d2ez.svelte-38d2ez{background-color:#ccc;bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0;transition:all 0.4s linear}.slider.svelte-38d2ez.svelte-38d2ez:before{background-color:#fff;bottom:4px;content:'';height:26px;left:4px;position:absolute;transition:all 0.4s linear;width:26px}.slider.svelte-38d2ez.svelte-38d2ez:hover::before{background-color:#ccc;transform:translateX(13px)}.slider.svelte-38d2ez.svelte-38d2ez:hover{background-color:#777}input.svelte-38d2ez:checked+.slider.svelte-38d2ez{background-color:#7a7a7a}input.svelte-38d2ez:checked+.slider.svelte-38d2ez:before{transform:translateX(26px)}input.svelte-38d2ez:hover+.slider.svelte-38d2ez:before{transform:translateX(13px)}.slider.round.svelte-38d2ez.svelte-38d2ez{border-radius:34px}.slider.round.svelte-38d2ez.svelte-38d2ez:before{border-radius:50%}@media only screen and (max-width: 500px){nav.svelte-38d2ez.svelte-38d2ez{font-size:14px}input.svelte-38d2ez:hover+.slider.svelte-38d2ez:before{transform:none}.slider.svelte-38d2ez.svelte-38d2ez:hover::before{background-color:#ccc;transform:none}.slider-img.svelte-38d2ez.svelte-38d2ez{width:20px;height:20px}.theme-switch.svelte-38d2ez.svelte-38d2ez{display:inline-block;height:20px;position:relative;width:50px}.slider.svelte-38d2ez.svelte-38d2ez:before{background-color:#fff;bottom:3px;content:'';height:15px;left:4px;position:absolute;transition:all 0.4s linear;width:15px}.theme-switch-wrapper.svelte-38d2ez.svelte-38d2ez{top:7px;position:relative}}",
  map: `{"version":3,"file":"Nav.svelte","sources":["Nav.svelte"],"sourcesContent":["<script>\\r\\n  export let segment;\\r\\n\\r\\n  import { onMount } from 'svelte';\\r\\n\\r\\n  onMount(() => {\\r\\n    const toggleSwitch = document.querySelector(\\r\\n      '.theme-switch input[type=\\"checkbox\\"]'\\r\\n    );\\r\\n\\r\\n    function switchTheme(e) {\\r\\n      if (e.target.checked) {\\r\\n        document.documentElement.setAttribute('data-theme', 'dark');\\r\\n      } else {\\r\\n        document.documentElement.setAttribute('data-theme', 'light');\\r\\n      }\\r\\n    }\\r\\n\\r\\n    toggleSwitch.addEventListener('change', switchTheme, false);\\r\\n  });\\r\\n<\/script>\\r\\n\\r\\n<nav>\\r\\n  <div class=\\"wrapper\\">\\r\\n    <section class=\\"links\\">\\r\\n      <a class=\\"a-logo\\" href=\\".\\">\\r\\n        <img src=\\"logo.svg\\" alt=\\"logo\\" class=\\"The Console Logs logo\\" />\\r\\n      </a>\\r\\n      <div class=\\"nav-links\\">\\r\\n        <a class={segment === undefined ? 'selected' : ''} href=\\".\\">home</a>\\r\\n\\r\\n        <a\\r\\n          rel=\\"prefetch\\"\\r\\n          class={segment === 'logs' ? 'selected' : ''}\\r\\n          href=\\"logs\\">\\r\\n          logs\\r\\n        </a>\\r\\n        <a\\r\\n          href=\\"https://dev.to/bdesigned\\"\\r\\n          class=\\"dev\\"\\r\\n          target=\\"_blank\\"\\r\\n          rel=\\"noopener noreferrer\\">\\r\\n          <img\\r\\n            src=\\"https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg\\"\\r\\n            alt=\\"Brittney Postma's DEV Profile\\"\\r\\n            height=\\"30\\"\\r\\n            width=\\"30\\" />\\r\\n        </a>\\r\\n      </div>\\r\\n    </section>\\r\\n    <section class=\\"theme-switch-wrapper\\">\\r\\n      <img\\r\\n        class=\\"slider-img\\"\\r\\n        src=\\"sun.png\\"\\r\\n        alt=\\"light-mode\\"\\r\\n        style=\\"margin-right: 0.5em;\\" />\\r\\n      <label\\r\\n        class=\\"theme-switch\\"\\r\\n        for=\\"checkbox\\"\\r\\n        aria-label=\\" Light and Dark mode switch\\">\\r\\n        <input type=\\"checkbox\\" id=\\"checkbox\\" />\\r\\n        <div class=\\"slider round\\" />\\r\\n      </label>\\r\\n      <img\\r\\n        class=\\"slider-img\\"\\r\\n        src=\\"moon.png\\"\\r\\n        alt=\\"dark-mode\\"\\r\\n        style=\\"margin-left: 0.5em;\\" />\\r\\n    </section>\\r\\n  </div>\\r\\n</nav>\\r\\n\\r\\n<style>\\r\\n  nav {\\r\\n    background: var(--nav-color);\\r\\n    border-bottom: 1px solid rgb(155, 50, 43);\\r\\n  }\\r\\n\\r\\n  .wrapper {\\r\\n    font-weight: 700;\\r\\n    padding: 1rem 0;\\r\\n    display: flex;\\r\\n    justify-content: space-between;\\r\\n    max-width: var(--max-width);\\r\\n    margin: 0 auto;\\r\\n    width: 100%;\\r\\n  }\\r\\n\\r\\n  .links {\\r\\n    display: flex;\\r\\n    align-items: center;\\r\\n  }\\r\\n\\r\\n  .a-logo {\\r\\n    margin: 0;\\r\\n    padding: 0;\\r\\n  }\\r\\n\\r\\n  .a-logo::before {\\r\\n    background: transparent;\\r\\n  }\\r\\n\\r\\n  .logo {\\r\\n    width: 50px;\\r\\n    transition: all 0.2s linear;\\r\\n    cursor: pointer;\\r\\n  }\\r\\n\\r\\n  .logo:hover {\\r\\n    transform: scale(1.2);\\r\\n  }\\r\\n\\r\\n  .nav-links {\\r\\n    display: flex;\\r\\n  }\\r\\n\\r\\n  a {\\r\\n    color: #424242;\\r\\n    text-decoration: none;\\r\\n    padding: 1em;\\r\\n    display: block;\\r\\n    position: relative;\\r\\n  }\\r\\n\\r\\n  a::before {\\r\\n    content: '';\\r\\n    position: absolute;\\r\\n    transition: transform 0.3s ease;\\r\\n    left: 12%;\\r\\n    bottom: 0;\\r\\n    top: 40px;\\r\\n    width: 75%;\\r\\n    height: 2px;\\r\\n    background: #aaa;\\r\\n    transform: scaleX(0);\\r\\n  }\\r\\n\\r\\n  a:hover::before,\\r\\n  .selected::before {\\r\\n    transform: scaleX(1);\\r\\n  }\\r\\n\\r\\n  .selected::before {\\r\\n    background: rgb(155, 50, 43);\\r\\n  }\\r\\n\\r\\n  .dev::before {\\r\\n    background: transparent;\\r\\n  }\\r\\n\\r\\n  .dev:hover::before {\\r\\n    background: transparent;\\r\\n  }\\r\\n\\r\\n  .slider-img {\\r\\n    width: 30px;\\r\\n    height: 30px;\\r\\n  }\\r\\n\\r\\n  .theme-switch-wrapper {\\r\\n    display: flex;\\r\\n    align-items: center;\\r\\n  }\\r\\n\\r\\n  .theme-switch {\\r\\n    display: inline-block;\\r\\n    height: 34px;\\r\\n    position: relative;\\r\\n    width: 60px;\\r\\n  }\\r\\n\\r\\n  .theme-switch input {\\r\\n    display: none;\\r\\n  }\\r\\n\\r\\n  .slider {\\r\\n    background-color: #ccc;\\r\\n    bottom: 0;\\r\\n    cursor: pointer;\\r\\n    left: 0;\\r\\n    position: absolute;\\r\\n    right: 0;\\r\\n    top: 0;\\r\\n    transition: all 0.4s linear;\\r\\n  }\\r\\n\\r\\n  .slider:before {\\r\\n    background-color: #fff;\\r\\n    bottom: 4px;\\r\\n    content: '';\\r\\n    height: 26px;\\r\\n    left: 4px;\\r\\n    position: absolute;\\r\\n    transition: all 0.4s linear;\\r\\n    width: 26px;\\r\\n  }\\r\\n\\r\\n  .slider:hover::before {\\r\\n    background-color: #ccc;\\r\\n    transform: translateX(13px);\\r\\n  }\\r\\n\\r\\n  .slider:hover {\\r\\n    background-color: #777;\\r\\n  }\\r\\n\\r\\n  input:checked + .slider {\\r\\n    background-color: #7a7a7a;\\r\\n  }\\r\\n\\r\\n  input:checked + .slider:before {\\r\\n    transform: translateX(26px);\\r\\n  }\\r\\n\\r\\n  input:hover + .slider:before {\\r\\n    transform: translateX(13px);\\r\\n  }\\r\\n\\r\\n  .slider.round {\\r\\n    border-radius: 34px;\\r\\n  }\\r\\n\\r\\n  .slider.round:before {\\r\\n    border-radius: 50%;\\r\\n  }\\r\\n\\r\\n  @media only screen and (max-width: 500px) {\\r\\n    nav {\\r\\n      font-size: 14px;\\r\\n    }\\r\\n\\r\\n    input:hover + .slider:before {\\r\\n      transform: none;\\r\\n    }\\r\\n\\r\\n    .slider:hover::before {\\r\\n      background-color: #ccc;\\r\\n      transform: none;\\r\\n    }\\r\\n\\r\\n    .slider-img {\\r\\n      width: 20px;\\r\\n      height: 20px;\\r\\n    }\\r\\n\\r\\n    .theme-switch {\\r\\n      display: inline-block;\\r\\n      height: 20px;\\r\\n      position: relative;\\r\\n      width: 50px;\\r\\n    }\\r\\n\\r\\n    .slider:before {\\r\\n      background-color: #fff;\\r\\n      bottom: 3px;\\r\\n      content: '';\\r\\n      height: 15px;\\r\\n      left: 4px;\\r\\n      position: absolute;\\r\\n      transition: all 0.4s linear;\\r\\n      width: 15px;\\r\\n    }\\r\\n    .theme-switch-wrapper {\\r\\n      top: 7px;\\r\\n      position: relative;\\r\\n    }\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAyEE,GAAG,4BAAC,CAAC,AACH,UAAU,CAAE,IAAI,WAAW,CAAC,CAC5B,aAAa,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,AAC3C,CAAC,AAED,QAAQ,4BAAC,CAAC,AACR,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,IAAI,CAAC,CAAC,CACf,OAAO,CAAE,IAAI,CACb,eAAe,CAAE,aAAa,CAC9B,SAAS,CAAE,IAAI,WAAW,CAAC,CAC3B,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,KAAK,CAAE,IAAI,AACb,CAAC,AAED,MAAM,4BAAC,CAAC,AACN,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,AACrB,CAAC,AAED,OAAO,4BAAC,CAAC,AACP,MAAM,CAAE,CAAC,CACT,OAAO,CAAE,CAAC,AACZ,CAAC,AAED,mCAAO,QAAQ,AAAC,CAAC,AACf,UAAU,CAAE,WAAW,AACzB,CAAC,AAED,KAAK,4BAAC,CAAC,AACL,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,MAAM,CAC3B,MAAM,CAAE,OAAO,AACjB,CAAC,AAED,iCAAK,MAAM,AAAC,CAAC,AACX,SAAS,CAAE,MAAM,GAAG,CAAC,AACvB,CAAC,AAED,UAAU,4BAAC,CAAC,AACV,OAAO,CAAE,IAAI,AACf,CAAC,AAED,CAAC,4BAAC,CAAC,AACD,KAAK,CAAE,OAAO,CACd,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,GAAG,CACZ,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,AACpB,CAAC,AAED,6BAAC,QAAQ,AAAC,CAAC,AACT,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,IAAI,CAC/B,IAAI,CAAE,GAAG,CACT,MAAM,CAAE,CAAC,CACT,GAAG,CAAE,IAAI,CACT,KAAK,CAAE,GAAG,CACV,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,IAAI,CAChB,SAAS,CAAE,OAAO,CAAC,CAAC,AACtB,CAAC,AAED,6BAAC,MAAM,QAAQ,CACf,qCAAS,QAAQ,AAAC,CAAC,AACjB,SAAS,CAAE,OAAO,CAAC,CAAC,AACtB,CAAC,AAED,qCAAS,QAAQ,AAAC,CAAC,AACjB,UAAU,CAAE,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,AAC9B,CAAC,AAED,gCAAI,QAAQ,AAAC,CAAC,AACZ,UAAU,CAAE,WAAW,AACzB,CAAC,AAED,gCAAI,MAAM,QAAQ,AAAC,CAAC,AAClB,UAAU,CAAE,WAAW,AACzB,CAAC,AAED,WAAW,4BAAC,CAAC,AACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACd,CAAC,AAED,qBAAqB,4BAAC,CAAC,AACrB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,AACrB,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,OAAO,CAAE,YAAY,CACrB,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,AACb,CAAC,AAED,2BAAa,CAAC,KAAK,cAAC,CAAC,AACnB,OAAO,CAAE,IAAI,AACf,CAAC,AAED,OAAO,4BAAC,CAAC,AACP,gBAAgB,CAAE,IAAI,CACtB,MAAM,CAAE,CAAC,CACT,MAAM,CAAE,OAAO,CACf,IAAI,CAAE,CAAC,CACP,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,CAAC,CACR,GAAG,CAAE,CAAC,CACN,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,MAAM,AAC7B,CAAC,AAED,mCAAO,OAAO,AAAC,CAAC,AACd,gBAAgB,CAAE,IAAI,CACtB,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,GAAG,CACT,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,MAAM,CAC3B,KAAK,CAAE,IAAI,AACb,CAAC,AAED,mCAAO,MAAM,QAAQ,AAAC,CAAC,AACrB,gBAAgB,CAAE,IAAI,CACtB,SAAS,CAAE,WAAW,IAAI,CAAC,AAC7B,CAAC,AAED,mCAAO,MAAM,AAAC,CAAC,AACb,gBAAgB,CAAE,IAAI,AACxB,CAAC,AAED,mBAAK,QAAQ,CAAG,OAAO,cAAC,CAAC,AACvB,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAED,mBAAK,QAAQ,CAAG,qBAAO,OAAO,AAAC,CAAC,AAC9B,SAAS,CAAE,WAAW,IAAI,CAAC,AAC7B,CAAC,AAED,mBAAK,MAAM,CAAG,qBAAO,OAAO,AAAC,CAAC,AAC5B,SAAS,CAAE,WAAW,IAAI,CAAC,AAC7B,CAAC,AAED,OAAO,MAAM,4BAAC,CAAC,AACb,aAAa,CAAE,IAAI,AACrB,CAAC,AAED,OAAO,kCAAM,OAAO,AAAC,CAAC,AACpB,aAAa,CAAE,GAAG,AACpB,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,GAAG,4BAAC,CAAC,AACH,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,mBAAK,MAAM,CAAG,qBAAO,OAAO,AAAC,CAAC,AAC5B,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,mCAAO,MAAM,QAAQ,AAAC,CAAC,AACrB,gBAAgB,CAAE,IAAI,CACtB,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,WAAW,4BAAC,CAAC,AACX,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACd,CAAC,AAED,aAAa,4BAAC,CAAC,AACb,OAAO,CAAE,YAAY,CACrB,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,AACb,CAAC,AAED,mCAAO,OAAO,AAAC,CAAC,AACd,gBAAgB,CAAE,IAAI,CACtB,MAAM,CAAE,GAAG,CACX,OAAO,CAAE,EAAE,CACX,MAAM,CAAE,IAAI,CACZ,IAAI,CAAE,GAAG,CACT,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,GAAG,CAAC,IAAI,CAAC,MAAM,CAC3B,KAAK,CAAE,IAAI,AACb,CAAC,AACD,qBAAqB,4BAAC,CAAC,AACrB,GAAG,CAAE,GAAG,CACR,QAAQ,CAAE,QAAQ,AACpB,CAAC,AACH,CAAC"}`
};
var Nav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { segment } = $$props;
  onMount(() => {
    const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
    function switchTheme(e) {
      if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.setAttribute("data-theme", "light");
      }
    }
    toggleSwitch.addEventListener("change", switchTheme, false);
  });
  if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0)
    $$bindings.segment(segment);
  $$result.css.add(css$4);
  return `<nav class="${"svelte-38d2ez"}"><div class="${"wrapper svelte-38d2ez"}"><section class="${"links svelte-38d2ez"}"><a class="${"a-logo svelte-38d2ez"}" href="${"."}"><img src="${"logo.svg"}" alt="${"logo"}" class="${"The Console Logs logo svelte-38d2ez"}"></a>
      <div class="${"nav-links svelte-38d2ez"}"><a class="${escape2(null_to_empty(segment === void 0 ? "selected" : "")) + " svelte-38d2ez"}" href="${"."}">home</a>

        <a rel="${"prefetch"}" class="${escape2(null_to_empty(segment === "logs" ? "selected" : "")) + " svelte-38d2ez"}" href="${"logs"}">logs
        </a>
        <a href="${"https://dev.to/bdesigned"}" class="${"dev svelte-38d2ez"}" target="${"_blank"}" rel="${"noopener noreferrer"}"><img src="${"https://d2fltix0v2e0sb.cloudfront.net/dev-badge.svg"}" alt="${"Brittney Postma's DEV Profile"}" height="${"30"}" width="${"30"}"></a></div></section>
    <section class="${"theme-switch-wrapper svelte-38d2ez"}"><img class="${"slider-img svelte-38d2ez"}" src="${"sun.png"}" alt="${"light-mode"}" style="${"margin-right: 0.5em;"}">
      <label class="${"theme-switch svelte-38d2ez"}" for="${"checkbox"}" aria-label="${" Light and Dark mode switch"}"><input type="${"checkbox"}" id="${"checkbox"}" class="${"svelte-38d2ez"}">
        <div class="${"slider round svelte-38d2ez"}"></div></label>
      <img class="${"slider-img svelte-38d2ez"}" src="${"moon.png"}" alt="${"dark-mode"}" style="${"margin-left: 0.5em;"}"></section></div>
</nav>`;
});
var css$3 = {
  code: "main.svelte-wk43eb{scroll-behavior:smooth;background-color:var(--bg-color);margin:0 auto;box-sizing:border-box;width:100%;color:var(--font-color);overflow-x:hidden}footer.svelte-wk43eb{border-top:1px solid rgb(155, 50, 43, 0.75);background:#333;color:white;display:flex;gap:2rem;place-content:center;padding:0.5rem}img.svelte-wk43eb{width:30px;height:30px}a.svelte-wk43eb{text-decoration:none;display:grid;place-items:center;position:relative;color:var(--font-color)}a.svelte-wk43eb::before{content:'';position:absolute;transition:transform 0.2s linear;left:0;bottom:0;width:100%;height:3px;background:var(--bg-color);transform:scaleX(0)}a.svelte-wk43eb:hover::before{transform:scaleX(1)}.links.svelte-wk43eb::before{background:transparent}.links.svelte-wk43eb{transition:0.2s linear all}.links.svelte-wk43eb:hover{filter:brightness(50%)}",
  map: `{"version":3,"file":"__layout.svelte","sources":["__layout.svelte"],"sourcesContent":["<script>\\r\\n  import Nav from '../components/Nav.svelte';\\r\\n\\r\\n  export let segment;\\r\\n<\/script>\\r\\n\\r\\n<Nav {segment} />\\r\\n\\r\\n<main>\\r\\n  <slot />\\r\\n</main>\\r\\n\\r\\n<footer>\\r\\n  <a\\r\\n    href=\\"https://www.linkedin.com/in/brittney-postma-868928178/\\"\\r\\n    rel=\\"noreferrer\\"\\r\\n    target=\\"_blank\\"\\r\\n    class=\\"links\\">\\r\\n    <img alt=\\"linkedin\\" src=\\"in.svg\\" />\\r\\n  </a>\\r\\n  <a\\r\\n    href=\\"https://twitter.com/brittneypostma\\"\\r\\n    rel=\\"noreferrer\\"\\r\\n    target=\\"_blank\\"\\r\\n    class=\\"links\\">\\r\\n    <img alt=\\"twitter\\" src=\\"twitter.svg\\" />\\r\\n  </a>\\r\\n\\r\\n  <a href=\\"https://www.bdesigned.dev/\\" rel=\\"noreferrer\\" target=\\"_blank\\" class=\\"links\\">\\r\\n    <img alt=\\"bdesigned\\" src=\\"bdesigned.svg\\" />\\r\\n  </a>\\r\\n\\r\\n  <a\\r\\n    href=\\"https://github.com/brittneypostma\\"\\r\\n    rel=\\"noreferrer\\"\\r\\n    target=\\"_blank\\"\\r\\n    class=\\"links\\">\\r\\n    <img alt=\\"github\\" src=\\"github.svg\\" />\\r\\n  </a>\\r\\n  <a\\r\\n    href=\\"https://www.youtube.com/channel/UCyvOaBoW3Jti69U4Gw1ci9Q?view_as=subscriber\\"\\r\\n    rel=\\"noreferrer\\"\\r\\n    target=\\"_blank\\"\\r\\n    class=\\"links\\">\\r\\n    <img alt=\\"youtube\\" src=\\"youtube.svg\\" />\\r\\n  </a>\\r\\n</footer>\\r\\n\\r\\n<style>\\r\\n  main {\\r\\n    scroll-behavior: smooth;\\r\\n    background-color: var(--bg-color);\\r\\n    margin: 0 auto;\\r\\n    box-sizing: border-box;\\r\\n    width: 100%;\\r\\n    color: var(--font-color);\\r\\n    overflow-x: hidden;\\r\\n  }\\r\\n\\r\\n  footer {border-top: 1px solid rgb(155, 50, 43, 0.75);\\r\\n    background: #333;\\r\\n    color: white;\\r\\n    display: flex;\\r\\n    gap: 2rem;\\r\\n    place-content: center;\\r\\n    padding: 0.5rem;\\r\\n  }\\r\\n\\r\\n\\r\\n  img {\\r\\n    width: 30px;\\r\\n    height: 30px;\\r\\n  }\\r\\n\\r\\n  a {\\r\\n    text-decoration: none;\\r\\n    display: grid;\\r\\n    place-items: center;\\r\\n    position: relative;\\r\\n    color: var(--font-color);\\r\\n  }\\r\\n\\r\\n  a::before {\\r\\n    content: '';\\r\\n    position: absolute;\\r\\n    transition: transform 0.2s linear;\\r\\n    left: 0;\\r\\n    bottom: 0;\\r\\n    width: 100%;\\r\\n    height: 3px;\\r\\n    background: var(--bg-color);\\r\\n    transform: scaleX(0);\\r\\n  }\\r\\n\\r\\n  a:hover::before {\\r\\n    transform: scaleX(1);\\r\\n  }\\r\\n\\r\\n  .links::before {\\r\\n    background: transparent;\\r\\n  }\\r\\n\\r\\n  .links {\\r\\n    transition: 0.2s linear all;\\r\\n  }\\r\\n\\r\\n  .links:hover {\\r\\n    filter: brightness(50%);\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAiDE,IAAI,cAAC,CAAC,AACJ,eAAe,CAAE,MAAM,CACvB,gBAAgB,CAAE,IAAI,UAAU,CAAC,CACjC,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,UAAU,CAAE,UAAU,CACtB,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,MAAM,cAAC,CAAC,UAAU,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAClD,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CACb,GAAG,CAAE,IAAI,CACT,aAAa,CAAE,MAAM,CACrB,OAAO,CAAE,MAAM,AACjB,CAAC,AAGD,GAAG,cAAC,CAAC,AACH,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,AACd,CAAC,AAED,CAAC,cAAC,CAAC,AACD,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,YAAY,CAAC,AAC1B,CAAC,AAED,eAAC,QAAQ,AAAC,CAAC,AACT,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,MAAM,CACjC,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,SAAS,CAAE,OAAO,CAAC,CAAC,AACtB,CAAC,AAED,eAAC,MAAM,QAAQ,AAAC,CAAC,AACf,SAAS,CAAE,OAAO,CAAC,CAAC,AACtB,CAAC,AAED,oBAAM,QAAQ,AAAC,CAAC,AACd,UAAU,CAAE,WAAW,AACzB,CAAC,AAED,MAAM,cAAC,CAAC,AACN,UAAU,CAAE,IAAI,CAAC,MAAM,CAAC,GAAG,AAC7B,CAAC,AAED,oBAAM,MAAM,AAAC,CAAC,AACZ,MAAM,CAAE,WAAW,GAAG,CAAC,AACzB,CAAC"}`
};
var _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { segment } = $$props;
  if ($$props.segment === void 0 && $$bindings.segment && segment !== void 0)
    $$bindings.segment(segment);
  $$result.css.add(css$3);
  return `${validate_component(Nav, "Nav").$$render($$result, { segment }, {}, {})}

<main class="${"svelte-wk43eb"}">${slots.default ? slots.default({}) : ``}</main>

<footer class="${"svelte-wk43eb"}"><a href="${"https://www.linkedin.com/in/brittney-postma-868928178/"}" rel="${"noreferrer"}" target="${"_blank"}" class="${"links svelte-wk43eb"}"><img alt="${"linkedin"}" src="${"in.svg"}" class="${"svelte-wk43eb"}"></a>
  <a href="${"https://twitter.com/brittneypostma"}" rel="${"noreferrer"}" target="${"_blank"}" class="${"links svelte-wk43eb"}"><img alt="${"twitter"}" src="${"twitter.svg"}" class="${"svelte-wk43eb"}"></a>

  <a href="${"https://www.bdesigned.dev/"}" rel="${"noreferrer"}" target="${"_blank"}" class="${"links svelte-wk43eb"}"><img alt="${"bdesigned"}" src="${"bdesigned.svg"}" class="${"svelte-wk43eb"}"></a>

  <a href="${"https://github.com/brittneypostma"}" rel="${"noreferrer"}" target="${"_blank"}" class="${"links svelte-wk43eb"}"><img alt="${"github"}" src="${"github.svg"}" class="${"svelte-wk43eb"}"></a>
  <a href="${"https://www.youtube.com/channel/UCyvOaBoW3Jti69U4Gw1ci9Q?view_as=subscriber"}" rel="${"noreferrer"}" target="${"_blank"}" class="${"links svelte-wk43eb"}"><img alt="${"youtube"}" src="${"youtube.svg"}" class="${"svelte-wk43eb"}"></a>
</footer>`;
});
var __layout = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _layout
});
var _error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<h1>Uh oh, something went wrong.</h1>`;
});
var __error = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": _error
});
var css$2 = {
  code: ".cont.svelte-1xt09uc{padding-bottom:10px;font-family:'Space Mono', monospace;line-height:1.65;display:grid;justify-items:center;text-align:center;max-width:100vw;height:calc(100vh - 115px);padding:2rem}img.svelte-1xt09uc{width:300px}h1.svelte-1xt09uc{font-size:2em;text-transform:uppercase;text-align:center;margin:0 auto;font-weight:600}a.svelte-1xt09uc{text-decoration:none;min-width:250px;margin-top:10px;border-radius:0.25rem;box-shadow:0 0 0 4px #424242, 0 8px 0 0 #424242;transition:transform 0.2s cubic-bezier(0, 0, 0.58, 1)}button.svelte-1xt09uc{min-height:40px;width:100%;font-family:var(--heading-font);color:white;font-size:2rem;cursor:pointer;outline:none;border:0;text-decoration:none;font-weight:600;background:rgb(155, 50, 43);border-radius:0.25rem;border:1px solid rgb(155,50,43);transform-style:preserve-3d;transition:transform 0.2s ease-in-out}button.svelte-1xt09uc:active{top:2px}button.svelte-1xt09uc:hover{filter:brightness(0.95)}@media(min-width: 800px){a.svelte-1xt09uc{min-width:565px}h1.svelte-1xt09uc{font-size:4em}img.svelte-1xt09uc{width:670px}}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script>\\r\\n  import { onMount } from 'svelte'\\r\\n  import { fade } from 'svelte/transition';\\r\\n\\r\\n  let ready = false\\r\\n  onMount(() => ready = true)\\r\\n\\r\\n  function typewriter(node, { speed = 75 }) {\\r\\n    const valid =\\r\\n      node.childNodes.length === 1 &&\\r\\n      node.childNodes[0].nodeType === Node.TEXT_NODE;\\r\\n\\r\\n    if (!valid) {\\r\\n      throw new Error(\\r\\n        \`This transition only works on elements with a single text node child\`\\r\\n      );\\r\\n    }\\r\\n\\r\\n    const text = node.textContent;\\r\\n    const duration = text.length * speed;\\r\\n\\r\\n    return {\\r\\n      duration,\\r\\n      tick: (t) => {\\r\\n        const i = ~~(text.length * t);\\r\\n        node.textContent = text.slice(0, i);\\r\\n      }\\r\\n    };\\r\\n  }\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n  <title>Console Logs</title>\\r\\n</svelte:head>\\r\\n{#if ready}\\r\\n<div class=\\"cont\\" in:fade={{ duration: 1000 }}>\\r\\n  <h1>The Console Logs</h1>\\r\\n  <p in:typewriter>A site for all my bytes of programming related knowledge.</p>\\r\\n  <img alt=\\"Brittney Postma animated sitting in front of computer filled with stickers.\\" src=\\"me.png\\" />\\r\\n  <a href=\\"/logs\\">\\r\\n    <button>LOGS</button>\\r\\n  </a>\\r\\n</div>\\r\\n{/if}\\r\\n<style>\\r\\n  .cont {\\r\\n    padding-bottom: 10px;\\r\\n    font-family: 'Space Mono', monospace;\\r\\n    line-height: 1.65;\\r\\n    display: grid;\\r\\n    justify-items: center;\\r\\n    text-align: center;\\r\\n    max-width: 100vw;\\r\\n    height: calc(100vh - 115px);\\r\\n    padding: 2rem;\\r\\n  }\\r\\n\\r\\n  img {\\r\\n    width: 300px;\\r\\n  }\\r\\n\\r\\n  h1 {\\r\\n    font-size: 2em;\\r\\n    text-transform: uppercase;\\r\\n    text-align: center;\\r\\n    margin: 0 auto;\\r\\n    font-weight: 600;\\r\\n  }\\r\\n\\r\\n  a {\\r\\n    text-decoration: none;\\r\\n    min-width: 250px;\\r\\n    margin-top: 10px;\\r\\n    border-radius: 0.25rem;\\r\\n    box-shadow: 0 0 0 4px #424242, 0 8px 0 0 #424242;\\r\\n    transition: transform 0.2s cubic-bezier(0, 0, 0.58, 1);\\r\\n  }\\r\\n\\r\\n  button {\\r\\n    min-height: 40px;\\r\\n    width: 100%;\\r\\n    font-family: var(--heading-font);\\r\\n    color: white;\\r\\n    font-size: 2rem;\\r\\n    cursor: pointer;\\r\\n    outline: none;\\r\\n    border: 0;\\r\\n    text-decoration: none;\\r\\n    font-weight: 600;\\r\\n    background:  rgb(155, 50, 43);\\r\\n    border-radius: 0.25rem;\\r\\n    border: 1px solid rgb(155,50,43);\\r\\n    transform-style: preserve-3d;\\r\\n    transition: transform 0.2s ease-in-out;\\r\\n  }\\r\\n\\r\\n  button:active {\\r\\n    top: 2px;\\r\\n  }\\r\\n\\r\\n  button:hover {\\r\\n    filter: brightness(0.95);\\r\\n  }\\r\\n\\r\\n  @media (min-width: 800px) {\\r\\n    a {\\r\\n      min-width: 565px;\\r\\n    }\\r\\n    h1 {\\r\\n      font-size: 4em;\\r\\n    }\\r\\n\\r\\n    img {\\r\\n      width: 670px;\\r\\n    }\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA6CE,KAAK,eAAC,CAAC,AACL,cAAc,CAAE,IAAI,CACpB,WAAW,CAAE,YAAY,CAAC,CAAC,SAAS,CACpC,WAAW,CAAE,IAAI,CACjB,OAAO,CAAE,IAAI,CACb,aAAa,CAAE,MAAM,CACrB,UAAU,CAAE,MAAM,CAClB,SAAS,CAAE,KAAK,CAChB,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,CAC3B,OAAO,CAAE,IAAI,AACf,CAAC,AAED,GAAG,eAAC,CAAC,AACH,KAAK,CAAE,KAAK,AACd,CAAC,AAED,EAAE,eAAC,CAAC,AACF,SAAS,CAAE,GAAG,CACd,cAAc,CAAE,SAAS,CACzB,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,CAAC,eAAC,CAAC,AACD,eAAe,CAAE,IAAI,CACrB,SAAS,CAAE,KAAK,CAChB,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,OAAO,CACtB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,OAAO,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,OAAO,CAChD,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,aAAa,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,AACxD,CAAC,AAED,MAAM,eAAC,CAAC,AACN,UAAU,CAAE,IAAI,CAChB,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,IAAI,cAAc,CAAC,CAChC,KAAK,CAAE,KAAK,CACZ,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,OAAO,CACf,OAAO,CAAE,IAAI,CACb,MAAM,CAAE,CAAC,CACT,eAAe,CAAE,IAAI,CACrB,WAAW,CAAE,GAAG,CAChB,UAAU,CAAG,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAC7B,aAAa,CAAE,OAAO,CACtB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,GAAG,CAAC,EAAE,CAAC,EAAE,CAAC,CAChC,eAAe,CAAE,WAAW,CAC5B,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,WAAW,AACxC,CAAC,AAED,qBAAM,OAAO,AAAC,CAAC,AACb,GAAG,CAAE,GAAG,AACV,CAAC,AAED,qBAAM,MAAM,AAAC,CAAC,AACZ,MAAM,CAAE,WAAW,IAAI,CAAC,AAC1B,CAAC,AAED,MAAM,AAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzB,CAAC,eAAC,CAAC,AACD,SAAS,CAAE,KAAK,AAClB,CAAC,AACD,EAAE,eAAC,CAAC,AACF,SAAS,CAAE,GAAG,AAChB,CAAC,AAED,GAAG,eAAC,CAAC,AACH,KAAK,CAAE,KAAK,AACd,CAAC,AACH,CAAC"}`
};
var Routes = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ready = false;
  onMount(() => ready = true);
  $$result.css.add(css$2);
  return `${$$result.head += `${$$result.title = `<title>Console Logs</title>`, ""}`, ""}
${ready ? `<div class="${"cont svelte-1xt09uc"}"><h1 class="${"svelte-1xt09uc"}">The Console Logs</h1>
  <p>A site for all my bytes of programming related knowledge.</p>
  <img alt="${"Brittney Postma animated sitting in front of computer filled with stickers."}" src="${"me.png"}" class="${"svelte-1xt09uc"}">
  <a href="${"/logs"}" class="${"svelte-1xt09uc"}"><button class="${"svelte-1xt09uc"}">LOGS</button></a></div>` : ``}`;
});
var index$1 = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Routes
});
var css$1 = {
  code: "section.svelte-1x8a7mk{padding:0 1rem;max-width:var(--max-width);margin:0 auto}img.svelte-1x8a7mk{height:50px;width:50px}.grid-logs.svelte-1x8a7mk{background:var(--bg-color);padding-bottom:50px;font-family:'Work Sans', sans-serif;font-size:1.5rem;line-height:1.65;display:grid;grid-template-columns:repeat(auto-fit, minmax(220px, 1fr));grid-gap:2em}.title.svelte-1x8a7mk{position:relative;padding:2.75rem 1rem;list-style-type:none;background:var(--bg-color);color:var(--font-color);box-shadow:0 10px 15px -3px rgba(0, 0, 0, 0.1),\r\n      0 4px 6px -2px rgba(0, 0, 0, 0.05);text-align:center;margin:0}.title.svelte-1x8a7mk:hover{top:-5px;box-shadow:0 4px 6px -1px rgba(0, 0, 0, 0.1),\r\n      0 2px 4px -1px rgba(0, 0, 0, 0.06)}.title.svelte-1x8a7mk:active{top:-2px}p.svelte-1x8a7mk{margin:0}a.svelte-1x8a7mk{text-decoration:none;background:var(--accent-color);display:block}a.svelte-1x8a7mk:visited{color:var(--font-color)}",
  map: `{"version":3,"file":"index.svelte","sources":["index.svelte"],"sourcesContent":["<script context=\\"module\\">\\r\\n  export async function load({ fetch }) {\\r\\n    const res = await fetch(\`logs.json\`);\\r\\n    const data = await res.json();\\r\\n\\r\\n    try {\\r\\n      if(res.status === 200) {\\r\\n      return { post: data };\\r\\n    }\\r\\n  } catch {\\r\\n     console.error(res.status, data.message);\\r\\n    }\\r\\n    return {\\r\\n      props: {\\r\\n        data\\r\\n      }\\r\\n    }\\r\\n  }\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n  import { fly } from 'svelte/transition';\\r\\n  export let posts;\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n  <title>Logs</title>\\r\\n</svelte:head>\\r\\n\\r\\n<section>\\r\\n  <h1>Logs</h1>\\r\\n\\r\\n  <div class=\\"grid-logs\\" in:fly={{ y: 200, duration: 1000 }}>\\r\\n    {#each posts as post}\\r\\n      <a rel=\\"prefetch\\" href=\\"logs/{post.slug}\\">\\r\\n        <div class=\\"title\\">\\r\\n          <img src={post.image || null} alt={post.slug} />\\r\\n          <p>{post.title}</p>\\r\\n        </div>\\r\\n      </a>\\r\\n    {/each}\\r\\n  </div>\\r\\n</section>\\r\\n\\r\\n<style>\\r\\n  section {\\r\\n    padding: 0 1rem;\\r\\n    max-width: var(--max-width);\\r\\n    margin: 0 auto;\\r\\n  }\\r\\n\\r\\n  img {\\r\\n    height: 50px;\\r\\n    width: 50px;\\r\\n  }\\r\\n  .grid-logs {\\r\\n    background: var(--bg-color);\\r\\n    padding-bottom: 50px;\\r\\n    font-family: 'Work Sans', sans-serif;\\r\\n    font-size: 1.5rem;\\r\\n    line-height: 1.65;\\r\\n    display: grid;\\r\\n    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\\r\\n    grid-gap: 2em;\\r\\n  }\\r\\n\\r\\n  .title {\\r\\n    position: relative;\\r\\n    padding: 2.75rem 1rem;\\r\\n    list-style-type: none;\\r\\n    background: var(--bg-color);\\r\\n    color: var(--font-color);\\r\\n    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),\\r\\n      0 4px 6px -2px rgba(0, 0, 0, 0.05);\\r\\n    text-align: center;\\r\\n    margin: 0;\\r\\n  }\\r\\n\\r\\n  .title:hover {\\r\\n    top: -5px;\\r\\n    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),\\r\\n      0 2px 4px -1px rgba(0, 0, 0, 0.06);\\r\\n  }\\r\\n\\r\\n  .title:active {\\r\\n    top: -2px;\\r\\n  }\\r\\n\\r\\n  p {\\r\\n    margin: 0;\\r\\n  }\\r\\n\\r\\n  a {\\r\\n    text-decoration: none;\\r\\n    background: var(--accent-color);\\r\\n    display: block;\\r\\n  }\\r\\n\\r\\n  a:visited {\\r\\n    color: var(--font-color);\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AA6CE,OAAO,eAAC,CAAC,AACP,OAAO,CAAE,CAAC,CAAC,IAAI,CACf,SAAS,CAAE,IAAI,WAAW,CAAC,CAC3B,MAAM,CAAE,CAAC,CAAC,IAAI,AAChB,CAAC,AAED,GAAG,eAAC,CAAC,AACH,MAAM,CAAE,IAAI,CACZ,KAAK,CAAE,IAAI,AACb,CAAC,AACD,UAAU,eAAC,CAAC,AACV,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,cAAc,CAAE,IAAI,CACpB,WAAW,CAAE,WAAW,CAAC,CAAC,UAAU,CACpC,SAAS,CAAE,MAAM,CACjB,WAAW,CAAE,IAAI,CACjB,OAAO,CAAE,IAAI,CACb,qBAAqB,CAAE,OAAO,QAAQ,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,CAC3D,QAAQ,CAAE,GAAG,AACf,CAAC,AAED,MAAM,eAAC,CAAC,AACN,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,OAAO,CAAC,IAAI,CACrB,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,IAAI,UAAU,CAAC,CAC3B,KAAK,CAAE,IAAI,YAAY,CAAC,CACxB,UAAU,CAAE,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;MAC9C,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACpC,UAAU,CAAE,MAAM,CAClB,MAAM,CAAE,CAAC,AACX,CAAC,AAED,qBAAM,MAAM,AAAC,CAAC,AACZ,GAAG,CAAE,IAAI,CACT,UAAU,CAAE,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC;MAC5C,CAAC,CAAC,GAAG,CAAC,GAAG,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,AACtC,CAAC,AAED,qBAAM,OAAO,AAAC,CAAC,AACb,GAAG,CAAE,IAAI,AACX,CAAC,AAED,CAAC,eAAC,CAAC,AACD,MAAM,CAAE,CAAC,AACX,CAAC,AAED,CAAC,eAAC,CAAC,AACD,eAAe,CAAE,IAAI,CACrB,UAAU,CAAE,IAAI,cAAc,CAAC,CAC/B,OAAO,CAAE,KAAK,AAChB,CAAC,AAED,gBAAC,QAAQ,AAAC,CAAC,AACT,KAAK,CAAE,IAAI,YAAY,CAAC,AAC1B,CAAC"}`
};
async function load$1({ fetch: fetch2 }) {
  const res = await fetch2(`logs.json`);
  const data = await res.json();
  try {
    if (res.status === 200) {
      return { post: data };
    }
  } catch (e) {
    console.error(res.status, data.message);
  }
  return { props: { data } };
}
var Logs = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { posts } = $$props;
  if ($$props.posts === void 0 && $$bindings.posts && posts !== void 0)
    $$bindings.posts(posts);
  $$result.css.add(css$1);
  return `${$$result.head += `${$$result.title = `<title>Logs</title>`, ""}`, ""}

<section class="${"svelte-1x8a7mk"}"><h1>Logs</h1>

  <div class="${"grid-logs svelte-1x8a7mk"}">${each(posts, (post) => `<a rel="${"prefetch"}" href="${"logs/" + escape2(post.slug)}" class="${"svelte-1x8a7mk"}"><div class="${"title svelte-1x8a7mk"}"><img${add_attribute("src", post.image || null, 0)}${add_attribute("alt", post.slug, 0)} class="${"svelte-1x8a7mk"}">
          <p class="${"svelte-1x8a7mk"}">${escape2(post.title)}</p></div>
      </a>`)}</div>
</section>`;
});
var index = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": Logs,
  load: load$1
});
var css = {
  code: "h1.svelte-16f8zs2{margin:0;font-size:36px}header.svelte-16f8zs2{position:fixed;padding:1rem}.post-page.svelte-16f8zs2{max-width:var(--max-width);margin:0 auto}.post-page.svelte-16f8zs2 a{text-decoration:none;display:inline-block;position:relative;color:var(--accent-color)}.post-page.svelte-16f8zs2 a::before{content:'';position:absolute;transition:transform 0.3s ease;left:0;bottom:0;width:100%;height:2px;background:var(--accent-color);transform:scaleX(0)}.post-page.svelte-16f8zs2 a:hover::before{transform:scaleX(1)}.post-page.svelte-16f8zs2 img{max-width:100%}.post-page.svelte-16f8zs2 #toc{scrollbar-color:rgb(155, 50, 43, 0.75) #333;scrollbar-width:thin;width:320px;padding:10px;position:fixed;overflow-y:auto;top:205px;bottom:47px;box-shadow:inset 0 0 10px black, 4px 0 8px 0 rgba(0, 0, 0, 0.25)}.post-page.svelte-16f8zs2 #main{height:calc(100vh - 100px);width:calc(100% - 375px);position:relative;padding:2rem 0;left:350px;top:71px}.post-page.svelte-16f8zs2 hr:first-child{clear:both}.post-page.svelte-16f8zs2 p{margin:0 auto}.post-page.svelte-16f8zs2 h16{font-weight:bold;line-height:1.2}.post-page.svelte-16f8zs2 h3{font-weight:bold;line-height:1.2}.post-page.svelte-16f8zs2 h4{font-weight:bold;line-height:1.2}.post-page.svelte-16f8zs2 h5{font-weight:bold;line-height:1.2}.post-page.svelte-16f8zs2 h6{font-weight:bold;line-height:1.2}.post-page.svelte-16f8zs2 h2{font-size:39.06px;font-weight:700;text-align:center}.post-page.svelte-16f8zs2 h2:first-child{margin:0}.post-page.svelte-16f8zs2 h3{font-size:25px}.post-page.svelte-16f8zs2 blockquote{background:var(--nav-color);color:#111;border-left:10px solid rgb(155, 50, 43, 0.75);margin:1.5em 10px;padding:0.1em 10px}.post-page.svelte-16f8zs2 ul{line-height:1.5;padding:0;margin:0 0 16px}.post-page.svelte-16f8zs2 ol{line-height:1.5;padding:0;margin:0 0 16px}.post-page.svelte-16f8zs2 li{list-style-type:none;margin-left:2em}.post-page.svelte-16f8zs2 dfn{border-radius:2px;position:relative;top:-0.9em;line-height:2rem;font-style:normal}.post-page.svelte-16f8zs2 table{width:100%;color:black}.post-page.svelte-16f8zs2 em{color:#888}.post-page.svelte-16f8zs2 table tr:nth-child(even){background-color:#eeeeee}.post-page.svelte-16f8zs2 table tr:nth-child(odd){background-color:#ffffff}.post-page.svelte-16f8zs2 table{border:1px solid black;border-collapse:collapse;word-break:normal}.post-page.svelte-16f8zs2 th{border:1px solid black;border-collapse:collapse;padding:15px;word-break:normal;text-align:left}.post-page.svelte-16f8zs2 td{border:1px solid black;border-collapse:collapse;word-break:normal;padding:15px;text-align:left}@media only screen and (max-width: 900px){header.svelte-16f8zs2{position:relative}.post-page.svelte-16f8zs2 #toc{box-shadow:0 0 0 0 transparent;position:relative;width:100%;overflow-y:hidden;top:0;bottom:0;border-right:none;border-bottom:2px dotted rgb(155, 50, 43)}.post-page.svelte-16f8zs2 #main{width:100%;left:0;top:0;padding:0 1rem}.post-page.svelte-16f8zs2 pre{width:100%;display:grid}}",
  map: `{"version":3,"file":"[slug].svelte","sources":["[slug].svelte"],"sourcesContent":["<script context=\\"module\\">\\r\\n  export async function load({ params, fetch }) {\\r\\n    // the \`slug\` parameter is available because\\r\\n    // this file is called [slug].svelte\\r\\n    const res = await fetch(\`logs/\${params.slug}.json\`);\\r\\n    const data = await res.json();\\r\\n\\r\\n    try {\\r\\n      if(res.status === 200) {\\r\\n      return { post: data };\\r\\n    }\\r\\n  } catch {\\r\\n     console.error(res.status, data.message);\\r\\n    }\\r\\n    return {\\r\\n      props: {\\r\\n        data\\r\\n      }\\r\\n    }\\r\\n  }\\r\\n<\/script>\\r\\n\\r\\n<script>\\r\\n  export let post;\\r\\n  import { fade } from 'svelte/transition';\\r\\n  import { onMount } from 'svelte';\\r\\n\\r\\n  onMount(() => {\\r\\n    [...document.querySelectorAll('a')]\\r\\n      .filter((a) => !!a.hash)\\r\\n      .forEach((a) => {\\r\\n        try {\\r\\n          if (!a.hash || !document.querySelectorAll(a.hash).length)\\r\\n            throw new Error(\\"Anchor isn't valid\\");\\r\\n          a.href = window.location + a.hash;\\r\\n        } catch (e) {\\r\\n          console.error('Error: ', e);\\r\\n        }\\r\\n      });\\r\\n  });\\r\\n<\/script>\\r\\n\\r\\n<svelte:head>\\r\\n  <title>{post.title}</title>\\r\\n</svelte:head>\\r\\n\\r\\n<section class=\\"post-page\\" in:fade={{ duration: 1000 }}>\\r\\n  <header>\\r\\n    <a rel=\\"prefetch\\" href=\\"logs\\">go back</a>\\r\\n    <h1>{post.title}</h1>\\r\\n  </header>\\r\\n  {@html post.html}\\r\\n</section>\\r\\n\\r\\n<style>\\r\\n  h1 {\\r\\n    margin: 0;\\r\\n    font-size: 36px;\\r\\n  }\\r\\n\\r\\n  header {\\r\\n    position: fixed;\\r\\n    padding: 1rem;\\r\\n  }\\r\\n\\r\\n  .post-page {\\r\\n    max-width: var(--max-width);\\r\\n    margin: 0 auto;\\r\\n  }\\r\\n\\r\\n  .post-page :global(a) {\\r\\n    text-decoration: none;\\r\\n    display: inline-block;\\r\\n    position: relative;\\r\\n    color: var(--accent-color);\\r\\n  }\\r\\n\\r\\n  .post-page :global(a::before) {\\r\\n    content: '';\\r\\n    position: absolute;\\r\\n    transition: transform 0.3s ease;\\r\\n    left: 0;\\r\\n    bottom: 0;\\r\\n    width: 100%;\\r\\n    height: 2px;\\r\\n    background: var(--accent-color);\\r\\n    transform: scaleX(0);\\r\\n  }\\r\\n\\r\\n  .post-page :global(a:hover::before) {\\r\\n    transform: scaleX(1);\\r\\n  }\\r\\n\\r\\n  .post-page :global(img) {\\r\\n    max-width: 100%;\\r\\n  }\\r\\n\\r\\n  .post-page :global(#toc) {\\r\\n    scrollbar-color: rgb(155, 50, 43, 0.75) #333;\\r\\n    scrollbar-width: thin;\\r\\n    width: 320px;\\r\\n    padding: 10px;\\r\\n    position: fixed;\\r\\n    overflow-y: auto;\\r\\n    top: 205px;\\r\\n    bottom: 47px;\\r\\n    box-shadow: inset 0 0 10px black, 4px 0 8px 0 rgba(0, 0, 0, 0.25);\\r\\n  }\\r\\n\\r\\n  .post-page :global(#main) {\\r\\n    height: calc(100vh - 100px);\\r\\n    width: calc(100% - 375px);\\r\\n    position: relative;\\r\\n    padding: 2rem 0;\\r\\n    left: 350px;\\r\\n    top: 71px;\\r\\n  }\\r\\n\\r\\n  .post-page :global(hr:first-child) {\\r\\n    clear: both;\\r\\n  }\\r\\n\\r\\n  .post-page :global(p) {\\r\\n    margin: 0 auto;\\r\\n  }\\r\\n\\r\\n  .post-page :global(h16) {\\r\\n    font-weight: bold;\\r\\n    line-height: 1.2;\\r\\n  }\\r\\n  .post-page :global(h3) {\\r\\n    font-weight: bold;\\r\\n    line-height: 1.2;\\r\\n  }\\r\\n  .post-page :global(h4) {\\r\\n    font-weight: bold;\\r\\n    line-height: 1.2;\\r\\n  }\\r\\n  .post-page :global(h5) {\\r\\n    font-weight: bold;\\r\\n    line-height: 1.2;\\r\\n  }\\r\\n  .post-page :global(h6) {\\r\\n    font-weight: bold;\\r\\n    line-height: 1.2;\\r\\n  }\\r\\n\\r\\n  .post-page :global(h2) {\\r\\n    font-size: 39.06px;\\r\\n    font-weight: 700;\\r\\n    text-align: center;\\r\\n  }\\r\\n\\r\\n  .post-page :global(h2):first-child {\\r\\n    margin: 0;\\r\\n  }\\r\\n\\r\\n  .post-page :global(h3) {\\r\\n    font-size: 25px;\\r\\n  }\\r\\n\\r\\n  .post-page :global(blockquote) {\\r\\n    background: var(--nav-color);\\r\\n    color: #111;\\r\\n    border-left: 10px solid rgb(155, 50, 43, 0.75);\\r\\n    margin: 1.5em 10px;\\r\\n    padding: 0.1em 10px;\\r\\n  }\\r\\n\\r\\n  .post-page :global(ul) {\\r\\n    line-height: 1.5;\\r\\n    padding: 0;\\r\\n    margin: 0 0 16px;\\r\\n  }\\r\\n\\r\\n  .post-page :global(ol) {\\r\\n    line-height: 1.5;\\r\\n    padding: 0;\\r\\n    margin: 0 0 16px;\\r\\n  }\\r\\n\\r\\n  .post-page :global(li) {\\r\\n    list-style-type: none;\\r\\n    margin-left: 2em;\\r\\n  }\\r\\n\\r\\n  .post-page :global(dfn) {\\r\\n    border-radius: 2px;\\r\\n    position: relative;\\r\\n    top: -0.9em;\\r\\n    line-height: 2rem;\\r\\n    font-style: normal;\\r\\n  }\\r\\n\\r\\n  .post-page :global(table) {\\r\\n    width: 100%;\\r\\n    color: black;\\r\\n  }\\r\\n\\r\\n  .post-page :global(em) {\\r\\n    color: #888;\\r\\n  }\\r\\n\\r\\n  .post-page :global(table tr:nth-child(even)) {\\r\\n    background-color: #eeeeee;\\r\\n  }\\r\\n  .post-page :global(table tr:nth-child(odd)) {\\r\\n    background-color: #ffffff;\\r\\n  }\\r\\n\\r\\n  .post-page :global(table) {\\r\\n    border: 1px solid black;\\r\\n    border-collapse: collapse;\\r\\n    word-break:normal;\\r\\n  }\\r\\n  .post-page :global(th) {\\r\\n    border: 1px solid black;\\r\\n    border-collapse: collapse;\\r\\n    padding: 15px;\\r\\n    word-break: normal;\\r\\n    text-align: left;\\r\\n  }  \\r\\n  .post-page :global(td) {\\r\\n    border: 1px solid black;\\r\\n    border-collapse: collapse;\\r\\n    word-break: normal;\\r\\n    padding: 15px;\\r\\n    text-align: left;\\r\\n  }\\r\\n\\r\\n  @media only screen and (max-width: 900px) {\\r\\n    header {\\r\\n      position: relative;\\r\\n    }\\r\\n    .post-page :global(#toc) {\\r\\n      box-shadow: 0 0 0 0 transparent;\\r\\n      position: relative;\\r\\n      width: 100%;\\r\\n      overflow-y: hidden;\\r\\n      top: 0;\\r\\n      bottom: 0;\\r\\n      border-right: none;\\r\\n      border-bottom: 2px dotted rgb(155, 50, 43);\\r\\n    }\\r\\n\\r\\n    .post-page :global(#main) {\\r\\n      width: 100%;\\r\\n      left: 0;\\r\\n      top: 0;\\r\\n      padding: 0 1rem;\\r\\n    }\\r\\n\\r\\n    .post-page :global(pre) {\\r\\n      width: 100%;\\r\\n      display: grid;\\r\\n    }\\r\\n  }\\r\\n</style>\\r\\n"],"names":[],"mappings":"AAuDE,EAAE,eAAC,CAAC,AACF,MAAM,CAAE,CAAC,CACT,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,MAAM,eAAC,CAAC,AACN,QAAQ,CAAE,KAAK,CACf,OAAO,CAAE,IAAI,AACf,CAAC,AAED,UAAU,eAAC,CAAC,AACV,SAAS,CAAE,IAAI,WAAW,CAAC,CAC3B,MAAM,CAAE,CAAC,CAAC,IAAI,AAChB,CAAC,AAED,yBAAU,CAAC,AAAQ,CAAC,AAAE,CAAC,AACrB,eAAe,CAAE,IAAI,CACrB,OAAO,CAAE,YAAY,CACrB,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,cAAc,CAAC,AAC5B,CAAC,AAED,yBAAU,CAAC,AAAQ,SAAS,AAAE,CAAC,AAC7B,OAAO,CAAE,EAAE,CACX,QAAQ,CAAE,QAAQ,CAClB,UAAU,CAAE,SAAS,CAAC,IAAI,CAAC,IAAI,CAC/B,IAAI,CAAE,CAAC,CACP,MAAM,CAAE,CAAC,CACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,GAAG,CACX,UAAU,CAAE,IAAI,cAAc,CAAC,CAC/B,SAAS,CAAE,OAAO,CAAC,CAAC,AACtB,CAAC,AAED,yBAAU,CAAC,AAAQ,eAAe,AAAE,CAAC,AACnC,SAAS,CAAE,OAAO,CAAC,CAAC,AACtB,CAAC,AAED,yBAAU,CAAC,AAAQ,GAAG,AAAE,CAAC,AACvB,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,yBAAU,CAAC,AAAQ,IAAI,AAAE,CAAC,AACxB,eAAe,CAAE,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAAC,IAAI,CAC5C,eAAe,CAAE,IAAI,CACrB,KAAK,CAAE,KAAK,CACZ,OAAO,CAAE,IAAI,CACb,QAAQ,CAAE,KAAK,CACf,UAAU,CAAE,IAAI,CAChB,GAAG,CAAE,KAAK,CACV,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,AACnE,CAAC,AAED,yBAAU,CAAC,AAAQ,KAAK,AAAE,CAAC,AACzB,MAAM,CAAE,KAAK,KAAK,CAAC,CAAC,CAAC,KAAK,CAAC,CAC3B,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,KAAK,CAAC,CACzB,QAAQ,CAAE,QAAQ,CAClB,OAAO,CAAE,IAAI,CAAC,CAAC,CACf,IAAI,CAAE,KAAK,CACX,GAAG,CAAE,IAAI,AACX,CAAC,AAED,yBAAU,CAAC,AAAQ,cAAc,AAAE,CAAC,AAClC,KAAK,CAAE,IAAI,AACb,CAAC,AAED,yBAAU,CAAC,AAAQ,CAAC,AAAE,CAAC,AACrB,MAAM,CAAE,CAAC,CAAC,IAAI,AAChB,CAAC,AAED,yBAAU,CAAC,AAAQ,GAAG,AAAE,CAAC,AACvB,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GAAG,AAClB,CAAC,AACD,yBAAU,CAAC,AAAQ,EAAE,AAAE,CAAC,AACtB,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GAAG,AAClB,CAAC,AACD,yBAAU,CAAC,AAAQ,EAAE,AAAE,CAAC,AACtB,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GAAG,AAClB,CAAC,AACD,yBAAU,CAAC,AAAQ,EAAE,AAAE,CAAC,AACtB,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GAAG,AAClB,CAAC,AACD,yBAAU,CAAC,AAAQ,EAAE,AAAE,CAAC,AACtB,WAAW,CAAE,IAAI,CACjB,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,yBAAU,CAAC,AAAQ,EAAE,AAAE,CAAC,AACtB,SAAS,CAAE,OAAO,CAClB,WAAW,CAAE,GAAG,CAChB,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,yBAAU,CAAC,AAAQ,EAAE,AAAC,YAAY,AAAC,CAAC,AAClC,MAAM,CAAE,CAAC,AACX,CAAC,AAED,yBAAU,CAAC,AAAQ,EAAE,AAAE,CAAC,AACtB,SAAS,CAAE,IAAI,AACjB,CAAC,AAED,yBAAU,CAAC,AAAQ,UAAU,AAAE,CAAC,AAC9B,UAAU,CAAE,IAAI,WAAW,CAAC,CAC5B,KAAK,CAAE,IAAI,CACX,WAAW,CAAE,IAAI,CAAC,KAAK,CAAC,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,CAAC,IAAI,CAAC,CAC9C,MAAM,CAAE,KAAK,CAAC,IAAI,CAClB,OAAO,CAAE,KAAK,CAAC,IAAI,AACrB,CAAC,AAED,yBAAU,CAAC,AAAQ,EAAE,AAAE,CAAC,AACtB,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,AAClB,CAAC,AAED,yBAAU,CAAC,AAAQ,EAAE,AAAE,CAAC,AACtB,WAAW,CAAE,GAAG,CAChB,OAAO,CAAE,CAAC,CACV,MAAM,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,AAClB,CAAC,AAED,yBAAU,CAAC,AAAQ,EAAE,AAAE,CAAC,AACtB,eAAe,CAAE,IAAI,CACrB,WAAW,CAAE,GAAG,AAClB,CAAC,AAED,yBAAU,CAAC,AAAQ,GAAG,AAAE,CAAC,AACvB,aAAa,CAAE,GAAG,CAClB,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,MAAM,CACX,WAAW,CAAE,IAAI,CACjB,UAAU,CAAE,MAAM,AACpB,CAAC,AAED,yBAAU,CAAC,AAAQ,KAAK,AAAE,CAAC,AACzB,KAAK,CAAE,IAAI,CACX,KAAK,CAAE,KAAK,AACd,CAAC,AAED,yBAAU,CAAC,AAAQ,EAAE,AAAE,CAAC,AACtB,KAAK,CAAE,IAAI,AACb,CAAC,AAED,yBAAU,CAAC,AAAQ,wBAAwB,AAAE,CAAC,AAC5C,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AACD,yBAAU,CAAC,AAAQ,uBAAuB,AAAE,CAAC,AAC3C,gBAAgB,CAAE,OAAO,AAC3B,CAAC,AAED,yBAAU,CAAC,AAAQ,KAAK,AAAE,CAAC,AACzB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CACvB,eAAe,CAAE,QAAQ,CACzB,WAAW,MAAM,AACnB,CAAC,AACD,yBAAU,CAAC,AAAQ,EAAE,AAAE,CAAC,AACtB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CACvB,eAAe,CAAE,QAAQ,CACzB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,MAAM,CAClB,UAAU,CAAE,IAAI,AAClB,CAAC,AACD,yBAAU,CAAC,AAAQ,EAAE,AAAE,CAAC,AACtB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,KAAK,CACvB,eAAe,CAAE,QAAQ,CACzB,UAAU,CAAE,MAAM,CAClB,OAAO,CAAE,IAAI,CACb,UAAU,CAAE,IAAI,AAClB,CAAC,AAED,OAAO,IAAI,CAAC,MAAM,CAAC,GAAG,CAAC,YAAY,KAAK,CAAC,AAAC,CAAC,AACzC,MAAM,eAAC,CAAC,AACN,QAAQ,CAAE,QAAQ,AACpB,CAAC,AACD,yBAAU,CAAC,AAAQ,IAAI,AAAE,CAAC,AACxB,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,WAAW,CAC/B,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,UAAU,CAAE,MAAM,CAClB,GAAG,CAAE,CAAC,CACN,MAAM,CAAE,CAAC,CACT,YAAY,CAAE,IAAI,CAClB,aAAa,CAAE,GAAG,CAAC,MAAM,CAAC,IAAI,GAAG,CAAC,CAAC,EAAE,CAAC,CAAC,EAAE,CAAC,AAC5C,CAAC,AAED,yBAAU,CAAC,AAAQ,KAAK,AAAE,CAAC,AACzB,KAAK,CAAE,IAAI,CACX,IAAI,CAAE,CAAC,CACP,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,CAAC,CAAC,IAAI,AACjB,CAAC,AAED,yBAAU,CAAC,AAAQ,GAAG,AAAE,CAAC,AACvB,KAAK,CAAE,IAAI,CACX,OAAO,CAAE,IAAI,AACf,CAAC,AACH,CAAC"}`
};
async function load({ params, fetch: fetch2 }) {
  const res = await fetch2(`logs/${params.slug}.json`);
  const data = await res.json();
  try {
    if (res.status === 200) {
      return { post: data };
    }
  } catch (e) {
    console.error(res.status, data.message);
  }
  return { props: { data } };
}
var U5Bslugu5D = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { post } = $$props;
  onMount(() => {
    [...document.querySelectorAll("a")].filter((a) => !!a.hash).forEach((a) => {
      try {
        if (!a.hash || !document.querySelectorAll(a.hash).length)
          throw new Error("Anchor isn't valid");
        a.href = window.location + a.hash;
      } catch (e) {
        console.error("Error: ", e);
      }
    });
  });
  if ($$props.post === void 0 && $$bindings.post && post !== void 0)
    $$bindings.post(post);
  $$result.css.add(css);
  return `${$$result.head += `${$$result.title = `<title>${escape2(post.title)}</title>`, ""}`, ""}

<section class="${"post-page svelte-16f8zs2"}"><header class="${"svelte-16f8zs2"}"><a rel="${"prefetch"}" href="${"logs"}">go back</a>
    <h1 class="${"svelte-16f8zs2"}">${escape2(post.title)}</h1></header>
  <!-- HTML_TAG_START -->${post.html}<!-- HTML_TAG_END -->
</section>`;
});
var _slug_ = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  [Symbol.toStringTag]: "Module",
  "default": U5Bslugu5D,
  load
});

// .svelte-kit/netlify/entry.js
init();
async function handler(event) {
  const { path: path2, httpMethod, headers, rawQuery, body, isBase64Encoded } = event;
  const query = new URLSearchParams(rawQuery);
  const type = headers["content-type"];
  const rawBody = type && isContentTypeTextual(type) ? isBase64Encoded ? Buffer.from(body, "base64").toString() : body : new TextEncoder("base64").encode(body);
  const rendered = await render({
    method: httpMethod,
    headers,
    path: path2,
    query,
    rawBody
  });
  if (rendered) {
    return {
      isBase64Encoded: false,
      statusCode: rendered.status,
      ...splitHeaders(rendered.headers),
      body: rendered.body
    };
  }
  return {
    statusCode: 404,
    body: "Not found"
  };
}
function splitHeaders(headers) {
  const h = {};
  const m = {};
  for (const key in headers) {
    const value = headers[key];
    const target = Array.isArray(value) ? m : h;
    target[key] = value;
  }
  return {
    headers: h,
    multiValueHeaders: m
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handler
});
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
/*!
 * strip-bom-string <https://github.com/jonschlinkert/strip-bom-string>
 *
 * Copyright (c) 2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */
/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 *
 * @license MIT <https://opensource.org/licenses/MIT>
 * @author Lea Verou <https://lea.verou.me>
 * @namespace
 * @public
 */
