export function isSuperset(set, subset) {
    for (const elem of subset) {
        if (!set.has(elem)) {
            return false;
        }
    }
    return true;
}

export function union(setA, setB) {
    const _union = new Set(setA);
    for (const elem of setB) {
        _union.add(elem);
    }
    return _union;
}

export function getIntersectionById(...arrays) {
    const idSets = arrays.map(array => new Set(array.map(item => item.id)));
    const intersectionSet = new Set(idSets[0]);
    idSets.slice(1).forEach(idSet => {
        intersectionSet.forEach(id => {
            if (!idSet.has(id)) {
                intersectionSet.delete(id);
            }
        });
    });
    return arrays[0].filter(item => intersectionSet.has(item.id));
}



export function symmetricDifference(setA, setB) {
    const _difference = new Set(setA);
    for (const elem of setB) {
        if (_difference.has(elem)) {
            _difference.delete(elem);
        } else {
            _difference.add(elem);
        }
    }
    return _difference;
}

export function difference(setA, setB) {
    const _difference = new Set(setA);
    for (const elem of setB) {
        _difference.delete(elem);
    }
    return _difference;
}