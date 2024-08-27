// Function to update the clock every second
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedTime = `${hours % 12 || 12}:${minutes}:${seconds} ${ampm}`;
    document.getElementById('clock').textContent = formattedTime;
}
setInterval(updateClock, 1000);
updateClock(); // Initialize clock immediately

// Function to simulate the attack
function sendAttack() {
    const ip = document.getElementById('ipAddress').value;
    const port = document.getElementById('port').value;

    if (!ip || !port) {
        document.getElementById('output').textContent = 'Please provide both IP address and port.';
        return;
    }

    document.getElementById('output').textContent = 'Attack simulation started...\n';

    let progress = 0;
    let packetsSent = 0;
    const interval = setInterval(() => {
        if (progress >= 100) {
            clearInterval(interval);
            document.getElementById('output').textContent += `\nAttack simulation completed. Total packets sent: ${packetsSent}.`;
        } else {
            progress += 5;
            packetsSent += 1; // Increment the packet count
            document.getElementById('output').textContent += `[${'='.repeat(progress / 5)}${' '.repeat(20 - (progress / 5))}] ${progress}% - Packets Sent: ${packetsSent}\n`;
        }
    }, 500);
}
