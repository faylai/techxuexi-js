import {of, from, delay, mergeMap,concatMap} from 'rxjs';

const dummyApi = (character: string|number) => {
    return of(`API response for character: ${character}`).pipe(
        delay(3000)
    )
}

from(["Calcifer", "Alchemist", "X-Men", "Link"])
    .pipe(
        concatMap(arr => dummyApi(arr))
    ).subscribe(i => {
    console.log('\r\n',i)
    console.log(new Date().toLocaleTimeString())
})

