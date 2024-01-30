const Badge = ({ type }: { type: number }) => {
    let n = 0;
    if (type < 0)
        n = 5;
    else if (type < 5)
        n = 5 - type;
    else
        n = 0;

    return (
        <div class="flex justify-center -mt-4 mb-4">
            <p class="flex items-center w-min bg-blue-100 text-blue-800 text-xs font-semibold gap-x-0.5 me-2 h-4 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 z-0 relative
after:content-[''] after:absolute after:top-0 after:right-0 after:h-3 after:w-3 after:bg-blue-100 after:rotate-45 after:align-baseline after:translate-y-0.5
after:dark:bg-blue-900 after:-z-10 after:scale-90 after:translate-x-1">
                {
                    [...Array(type > 0 ? type : 0)].map((_,) => <span class="text-amber-300 inline-block align-middle text-base">✮</span>)

                }
                {
                    [...Array(n)].map((_,) => <span class="text-slate-600 inline-block align-middle text-base">✮</span>)

                }
            </p>
        </div>
    )
}

export default Badge