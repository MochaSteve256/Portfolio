import { useEffect } from "react";

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

    useEffect(() => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId: string | null = anchor.getAttribute('href');
                if (!targetId) {
                    return;
                }
                const targetElement = document.querySelector(targetId);
    
                // Calculate the target position
                if (!targetElement) {
                    return;
                }
                const targetRect = targetElement.getBoundingClientRect();
                const targetPosition = Math.min(
                    targetRect.top + window.scrollY,
                    document.documentElement.scrollHeight - window.innerHeight
                );
    
                // Smooth scroll to the target
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
    
                // Dispatch the custom event when the smooth scrolling starts
                const event = new CustomEvent("customScrollStart");
                document.dispatchEvent(event);
    
                // Set a timer to check if scrolling reaches its destination
                const timeout = 1000; // Adjust timeout as needed
                const scrollTimer = setTimeout(() => {
                    const endEvent = new CustomEvent("customScrollEnd");
                    document.dispatchEvent(endEvent);
                }, timeout);
    
                // Listen for scroll events to check when the smooth scroll reaches its destination
                const scrollListener = () => {
                    const currentPosition = window.scrollY;
                    const tolerance = 1; // Tolerance for comparing scroll positions
                    if (Math.abs(currentPosition - targetPosition) <= tolerance) {
                        // Clear the timer if the destination is reached
                        clearTimeout(scrollTimer);
                        const endEvent = new CustomEvent("customScrollEnd");
                        document.dispatchEvent(endEvent);
                        // Remove the scroll listener once the destination is reached
                        window.removeEventListener('scroll', scrollListener);
                    }
                };
    
                window.addEventListener('scroll', scrollListener);
            });
        });
    }, []);
    
    

    return (
        <div style={{ background: "#102040" }}>
            <section id="home"/>
            <canvas id="scene"/>
            <canvas id="overlay"/>
            <div id="loading">
                <p style={{ fontFamily: "UbuntuMono" }}>Loading...  </p>
                <img src="icons/ZZ5H.gif" alt="loading" style={{ width: "32px", height: "32px" }}/>
            </div>
            <main>
                <div id="text">
                    <div id="content">
                        <header>
                            <h1>Adrian</h1>
                            <h2>aka <span id="name">MochaSteve256</span></h2>
                        </header>

                        <section id="about"/>
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
                        <section id="projects"/>
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
                        <section id="contact"/>
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
                </div>
            </main>

            <script src="/src/components/three.ts"></script>
        </div>
    )
}

export default Home