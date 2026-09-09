from decimal import Decimal

from django.core.management.base import BaseCommand

from products.models import Category, Product
from services.models import Service


class Command(BaseCommand):
    help = 'Popula serviços, categorias e produtos iniciais da AUqMIA Pet.'

    def handle(self, *args, **options):
        services = [
            ('Banho', 'Higienização completa com produtos adequados à pele do pet.', Decimal('35.00'), 45),
            ('Tosa', 'Corte alinhado ao porte, à raça e ao estilo escolhido pelo tutor.', Decimal('50.00'), 60),
            ('Banho + Tosa', 'Combo de limpeza, corte e acabamento no mesmo horário.', Decimal('75.00'), 90),
            ('Tosa higiênica', 'Acabamento nas áreas sensíveis para mais higiene e conforto.', Decimal('30.00'), 30),
            ('Corte de unhas', 'Corte seguro, sem pressa e com contenção gentil.', Decimal('15.00'), 15),
            ('Hidratação', 'Tratamento para pelagem ressecada, opaca ou com nós.', Decimal('25.00'), 25),
            ('Limpeza de ouvido', 'Higienização delicada para prevenir odor e acúmulo de cera.', Decimal('18.00'), 15),
        ]

        for name, description, price, duration in services:
            Service.objects.get_or_create(
                name=name,
                defaults={
                    'description': description,
                    'price': price,
                    'estimated_duration': duration,
                    'active': True,
                },
            )

        categories = {
            'Rações': 'racoes',
            'Petiscos': 'petiscos',
            'Brinquedos': 'brinquedos',
            'Higiene': 'higiene',
            'Acessórios': 'acessorios',
        }
        category_map = {}
        for name, slug in categories.items():
            category_map[slug], _ = Category.objects.get_or_create(slug=slug, defaults={'name': name})

        products = [
            ('Ração Premium Adulto', 'racoes', 'Fórmula completa para cães adultos.', Decimal('189.90'), 20),
            ('Petisco natural assado', 'petiscos', 'Petisco crocante, sem corante artificial.', Decimal('24.90'), 40),
            ('Brinquedo de corda', 'brinquedos', 'Corda resistente para puxar e mastigar.', Decimal('32.00'), 15),
            ('Coleira ajustável', 'acessorios', 'Coleira com fivela segura e acabamento macio.', Decimal('49.90'), 18),
            ('Cama para pet', 'acessorios', 'Cama alta e lavável para o descanso diário.', Decimal('159.00'), 8),
            ('Shampoo para pelagem', 'higiene', 'Shampoo de pH equilibrado para uso frequente.', Decimal('39.90'), 25),
        ]

        for name, slug, description, price, stock in products:
            Product.objects.get_or_create(
                name=name,
                defaults={
                    'category': category_map[slug],
                    'description': description,
                    'price': price,
                    'stock': stock,
                    'active': True,
                },
            )

        self.stdout.write(self.style.SUCCESS('Catálogo inicial criado com sucesso.'))
