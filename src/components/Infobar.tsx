export const Infobar = ({ info }: { info: string }) => {

    switch (info) {
        case "INF-1":
            return (
                <div class="mb-2 ml-1 flex flex-col items-center">
                    <div class="h-4 w-1.5 overflow-hidden rounded-full bg-gray-200">
                        <div class="h-full bg-gradient-to-t from-gray-200 via-blue-400 to-blue-600" style="height: 60%"></div>
                    </div>
                    <span class="mt-1 text-xs text-gray-300">1</span>
                </div>

            )
        case "INF-2":
            return (
                <div class="mb-2 ml-1 flex flex-col items-center">
                    <div class="h-5 w-1.5 overflow-hidden rounded-full bg-gray-200">
                        <div class="h-full bg-gradient-to-t from-gray-200 via-blue-400 to-blue-600" style="height: 60%"></div>
                    </div>
                    <span class="mt-1 text-xs text-gray-300">2</span>
                </div>

            )
        case "INF-3":
            return (
                <div class="mb-2 ml-1 flex flex-col items-center">
                    <div class="h-6 w-1.5 overflow-hidden rounded-full bg-gray-200">
                        <div class="h-full bg-gradient-to-t from-gray-200 via-blue-400 to-blue-600" style="height: 60%"></div>
                    </div>
                    <span class="mt-1 text-xs text-gray-300">3</span>
                </div>

            )
        case "INF-4":
            return (
                <div class="mb-2 ml-1 flex flex-col items-center">
                    <div class="h-7 w-1.5 overflow-hidden rounded-full bg-gray-200">
                        <div class="h-full bg-gradient-to-t from-gray-200 via-blue-400 to-blue-600" style="height: 60%"></div>
                    </div>
                    <span class="mt-1 text-xs text-gray-300">4</span>
                </div>

            )
        case "INF-5":
            return (
                <div class="mb-2 ml-1 flex flex-col items-center">
                    <div class="h-8 w-1.5 overflow-hidden rounded-full bg-gray-200">
                        <div class="h-full bg-gradient-to-t from-gray-200 via-blue-400 to-blue-600" style="height: 60%"></div>
                    </div>
                    <span class="mt-1 text-xs text-gray-300">5</span>
                </div>

            )
        case "INF-11":
            return (
                <div class="mb-2 ml-1 flex flex-col items-center">
                    <div class="h-9 w-1.5 overflow-hidden rounded-full bg-gray-200">
                        <div class="h-full bg-gradient-to-t from-gray-200 via-blue-400 to-blue-600" style="height: 60%"></div>
                    </div>
                    <span class="mt-1 text-xs text-gray-300">o</span>
                </div>

            )
        case "INF-6":
            return (
                <div class="mb-2 ml-1 flex flex-col items-center">
                    <div class="h-10 w-1.5 overflow-hidden rounded-full bg-gray-200">
                        <div class="h-full bg-gradient-to-t from-gray-200 via-blue-400 to-blue-600" style="height: 60%"></div>
                    </div>
                    <span class="mt-1 text-xs text-gray-300">6</span>
                </div>

            )
        case "INF-7":
            return (
                <div class="mb-2 ml-1 flex flex-col items-center">
                    <div class="h-12 w-1.5 overflow-hidden rounded-full bg-gray-200">
                        <div class="h-full bg-gradient-to-t from-gray-200 via-rose-400 to-rose-600" style="height: 60%"></div>
                    </div>
                    <span class="mt-1 text-xs text-gray-300">7</span>
                </div>

            )
        default:
            return (
                <></>
            )
    }
}
