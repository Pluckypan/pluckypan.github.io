function toTimestamp(t) {
    return new Date(t).getTime();
}
let sleep = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

function unique(arr) {
    return Array.from(new Set(arr))
}

Array.prototype.shuffle = function () {
    let array = JSON.parse(JSON.stringify(this));
    var m = array.length,
        t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = array[m];
        array[m] = array[i];
        array[i] = t;
    }
    return array;
};

String.prototype.hashCode = function () {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
        chr = this.charCodeAt(i);
        hash = ((hash << 5) - hash) + chr;
        hash |= 0;
    }
    return hash;
};

String.prototype.containsIf = function (target, ignoreCase) {
    let str = ignoreCase ? this.toLowerCase() : this;
    let tar = ignoreCase ? target.toLowerCase() : target;
    return str.indexOf(tar) >= 0;
}

String.prototype.inPost = function (itm) {
    let key = `${this}`;
    return itm.name.containsIf(key, true) ||
        itm.desc.containsIf(key, true) ||
        itm.category.containsIf(key, true) ||
        $.inArray(key, itm.tags) >= 0
}

Array.prototype.postSortBy = function (hot) {
    let array = [];
    if (hot) {
        array = this.sort((a, b) => {
            let bb = b.banner ? 1582201220000 : 0;
            let ab = a.banner ? 1582201220000 : 0;
            let t = (toTimestamp(b.update_time) + bb) - (toTimestamp(a.update_time) + ab);
            return t;
        });
    } else {
        array = this.sort((a, b) => toTimestamp(b.update_time) - toTimestamp(a.update_time));
    }
    return array;
};

Array.prototype.checkSubset = function (subArray) {
    let parentArray = this;
    return subArray.every((el) => {
        return parentArray.includes(el)
    })
}