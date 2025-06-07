<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PortariaTech - Painel</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="icon" type="image/x-icon" href="{{ asset('img/logoPortaria.png') }}">
</head>
<body class="bg-gray-100">
    <nav class="bg-white shadow-lg">
        <div class="max-w-6xl mx-auto px-4">
            <div class="flex justify-between">
                <div class="flex space-x-7">
                    <div>
                        <a href="/" class="flex items-center py-4">
                            <div class="logo">
                                <img src="{{ asset('img/logo.png') }}" alt="Logo PortariaTech" class="logo-img">
                                <span class="font-semibold text-gray-500 text-lg">PortariaTech</span>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>

    <main>
        @yield('content')
    </main>

    <footer class="bg-white shadow-lg mt-8">
        <div class="container mx-auto px-4 py-6">
            <p class="text-center text-gray-500">&copy; 2024 PortariaTech. Todos os direitos reservados.</p>
        </div>
    </footer>
</body>
</html> 