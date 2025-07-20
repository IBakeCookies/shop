.PHONY: dev-up dev-down prod-up prod-down clean help dev-logs dev-shell prune

dev-up:
	docker compose -f docker-compose.dev.yml up --build -d

dev-down:
	docker compose -f docker-compose.dev.yml down

prod-up:
	docker compose -f docker-compose.prod.yml up --build -d

prod-down:
	docker compose -f docker-compose.prod.yml down

# Cleanup
clean:
	docker compose -f docker-compose.dev.yml down -v
	docker compose -f docker-compose.prod.yml down -v

# Tail development logs
dev-logs:
	docker compose -f docker-compose.dev.yml logs -f

# Access development container shell
dev-shell:
	docker compose -f docker-compose.dev.yml exec shop-dev sh

# Prune all unused Docker objects
prune:
	docker system prune -a --volumes

# Help
help:
	@echo "Usage:"
	@echo "  make dev-up      - Start development environment"
	@echo "  make dev-down    - Stop development environment"
	@echo "  make prod-up     - Start production environment"
	@echo "  make prod-down   - Stop production environment"
	@echo "  make clean       - Remove containers and volumes"