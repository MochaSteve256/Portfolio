import React, { useEffect } from "react";

function Home() {
    useEffect(() => {
        const script = document.createElement("script");

        script.src = "src/components/three.ts";
        script.type = "module";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div>
            <canvas id="bg"></canvas>
            <main>
                <div id="text">
                    <header>
                        <h1>Adrian</h1>
                        <h2>aka <span id="name">MochaSteve256</span></h2>
                    </header>

                    <p>blah</p>
                    <p>Lorem ipsum dolor sit amet</p>
                    <p>consectetur adipiscing elit</p>
                    <p>sed do eiusmod tempor incididunt</p>
                    <p>ut labore et dolore magna aliqua</p>
                    <p>Ut enim ad minim veniam</p>
                    <p>
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat
                    </p>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur
                    </p>
                    <p>Excepteur sint occaecat cupidatat non proident</p>
                    <p>
                        sunt in culpa qui officia deserunt mollit anim id est
                        laborum
                    </p>
                    <p>Lorem ipsum dolor sit amet</p>
                    <p>consectetur adipiscing elit</p>
                    <p>sed do eiusmod tempor incididunt</p>
                    <p>ut labore et dolore magna aliqua</p>
                    <p>Ut enim ad minim veniam</p>
                    <p>
                        quis nostrud exercitation ullamco laboris nisi ut aliquip ex
                        ea commodo consequat
                    </p>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit
                        esse cillum dolore eu fugiat nulla pariatur
                    </p>
                    <p>Excepteur sint occaecat cupidatat non proident</p>
                    <p>
                        sunt in culpa qui officia deserunt mollit anim id est
                        laborum
                    </p>
                </div>
            </main>

            <script src="/src/components/three.ts"></script>
        </div>
    )
}

export default Home