<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Gemini Chatbot - Laravel</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
</head>
<body class="bg-gray-100">
    <div class="max-w-md mx-auto h-screen flex flex-col p-4">
        <div class="bg-blue-600 text-white p-4 rounded-t-lg shadow-lg">
            <h1 class="text-xl font-bold">Gemini AI Assistant</h1>
            <p class="text-xs text-blue-100">Online | Powered by Google</p>
        </div>

        <div id="chat-container" class="flex-1 bg-white p-4 overflow-y-auto border-x shadow-inner flex flex-col space-y-4">
            <div class="bg-gray-200 self-start p-3 rounded-lg text-sm max-w-[80%]">
                Halo! Ada yang bisa saya bantu hari ini?
            </div>
        </div>

        <div class="bg-white p-4 rounded-b-lg shadow-lg border-t flex gap-2">
            <input type="text" id="user-input" placeholder="Tulis pesan..." 
                   class="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-blue-500">
            <button id="send-btn" class="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition">
                Kirim
            </button>
        </div>
    </div>

    <script>
        function appendMessage(sender, text, type) {
            const bgColor = type === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-200 text-gray-800 self-start';
            const messageHtml = `<div class="${bgColor} p-3 rounded-lg text-sm max-w-[80%] shadow-sm">
                                    <strong>${sender}:</strong><br>${text}
                                 </div>`;
            $('#chat-container').append(messageHtml);
            $('#chat-container').scrollTop($('#chat-container')[0].scrollHeight);
        }

        $('#send-btn').on('click', function() {
            const message = $('#user-input').val();
            if (!message) return;

            appendMessage('Anda', message, 'user');
            $('#user-input').val('');

            // Loading state
            const loadingId = 'loading-' + Date.now();
            $('#chat-container').append(`<div id="${loadingId}" class="text-xs text-gray-400 self-start italic">Gemini sedang berpikir...</div>`);

            $.ajax({
                url: 'http://127.0.0.1:8000/api/chat',   
                method: 'POST',
                data: JSON.stringify({ message: message }),
                contentType: 'application/json',
                success: function(response) {
                    $(`#${loadingId}`).remove();
                    appendMessage('Gemini', response.reply, 'bot');
                },
                error: function() {
                    $(`#${loadingId}`).text('Gagal mengambil respon.');
                }
            });
        });

        // Kirim pakai Enter
        $('#user-input').on('keypress', function(e) {
            if(e.which == 13) $('#send-btn').click();
        });
    </script>
</body>
</html>