const Badge = ({ type }: { type: number }) => {
    // console.log(type)
    let n = 0;
    if (type === undefined || type < 0)
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
                    [...Array(type > 0 ? type : 0)].map((_,) =>
                        <svg
                            viewBox="0 0 282.3 270.1"
                            width="16" height="16"
                            xmlns="http://www.w3.org/2000/svg">
                            <defs>
                                <linearGradient
                                    id="a"
                                    gradientUnits="userSpaceOnUse"
                                    x1="338.9"
                                    x2="322.8"
                                    y1="292.1"
                                    y2="203.1"
                                >
                                    <stop offset="0" stop-color="#e6d82f"></stop>
                                    <stop offset="1" stop-color="#faf26f"></stop>
                                </linearGradient>
                                <linearGradient
                                    id="b"
                                    gradientUnits="userSpaceOnUse"
                                    x1="391.9"
                                    x2="341.2"
                                    y1="310.6"
                                    y2="310.6"
                                >
                                    <stop offset="0" stop-color="#d2c308"></stop>
                                    <stop offset="1" stop-color="#e8da34"></stop>
                                </linearGradient>
                            </defs>
                            <g fill-rule="evenodd" transform="translate(-198.9 -145.7)">
                                <path d="m340.1 292.8l-.4-140.5-32.16 98.6z" fill="url(#a)"></path>
                                <path d="m340.2 152.4l31.45 97.64-31.04 42.7z" fill="#d2c308"></path>
                                <path d="m341.1 292.4l133.8-42.39-103.6-.01z" fill="#faf26f"></path>
                                <path d="m341 293.1l50.85 17.34 83.1-60.32z" fill="#a29910"></path>
                                <path d="m289.1 310.6l50.32-17.12-134.2-43.5z" fill="#d2c308"></path>
                                <path d="m339.6 293.8l-82.67 114.1 32.22-99.1z" fill="#faf26f"></path>
                                <path d="m341.1 293.6l50.78 16.82 31.72 97.69z" fill="url(#b)"></path>
                                <path d="m340.2 348.6l83.08 59.65-82.56-114.4z" fill="#a29910"></path>
                                <path d="m306.9 251.2l33.56 42.72-135.6-43.9z" fill="#faf26f"></path>
                                <path d="m340.2 348.6l-82.9 59.3 83.03-114.5z" fill="#a29910"></path>
                            </g>
                        </svg>
                    )

                }
                {
                    [...Array(n)].map((_,) =>
                        <svg viewBox="0 0 282.3 270.1" width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                            <defs />
                            <g fill-rule="evenodd" transform="translate(-198.9 -145.7)">
                                <path d="m340.1 292.8l-.4-140.5-32.16 98.6z" fill="#4b5563" />
                                <path d="m340.2 152.4l31.45 97.64-31.04 42.7z" fill="#4b5563" />
                                <path d="m341.1 292.4l133.8-42.39-103.6-.01z" fill="#4b5563" />
                                <path d="m341 293.1l50.85 17.34 83.1-60.32z" fill="#4b5563" />
                                <path d="m289.1 310.6l50.32-17.12-134.2-43.5z" fill="#4b5563" />
                                <path d="m339.6 293.8l-82.67 114.1 32.22-99.1z" fill="#4b5563" />
                                <path d="m341.1 293.6l50.78 16.82 31.72 97.69z" fill="#4b5563" />
                                <path d="m340.2 348.6l83.08 59.65-82.56-114.4z" fill="#4b5563" />
                                <path d="m306.9 251.2l33.56 42.72-135.6-43.9z" fill="#4b5563" />
                                <path d="m340.2 348.6l-82.9 59.3 83.03-114.5z" fill="#4b5563" />
                            </g>
                        </svg>
                    )

                }
            </p>
        </div>
    )
}

export default Badge