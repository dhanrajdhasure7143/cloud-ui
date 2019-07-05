export class CookieStore {
    static set(name, value, opts = {}) {
        value = CookieStore.prepareValue(value);
        opts = CookieStore.prepareOpts(opts);

        let updatedCookie = name + '=' + value;

        for (let i in opts) {
            if (!opts.hasOwnProperty(i)) continue;

            updatedCookie += '; ' + i;

            const value = opts[i];

            if (value !== true)
                updatedCookie += '=' + value;
        }

        document.cookie = updatedCookie;
    }

    static prepareValue(value) {
        return encodeURIComponent(value);
    }

    
    static prepareOpts(opts = {}) {
        opts = Object.assign({}, opts);

        // let {expires} = opts;

        // if (typeof expires == 'number' && expires) {
        //     const date = new Date();

        //     date.setTime(date.getTime() + expires * 1000);

        //     expires = opts.expires = date;
        // }

        // if (expires && expires.toUTCString)
        //     opts.expires = expires.toUTCString();

        return opts;
    }
}