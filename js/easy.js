function toTimestamp(t) {
    return new Date(t).getTime();
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

String.prototype.inPost = function (itm) {
    let key = `${this}`;
    return itm.name.indexOf(key) >= 0 ||
        itm.desc.indexOf(key) >= 0 ||
        itm.category.indexOf(key) >= 0 ||
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