# 🐳 Docker로 WordPress + MySQL 구성하기

이 문서는 Docker를 이용해 WordPress와 MySQL을 **같은 네트워크 내에 컨테이너로 실행**하는 방법을 정리한 가이드입니다.

---

## 📦 사전 준비

- Docker가 설치되어 있어야 합니다.
- 사용할 포트 및 문자 인코딩 관련 환경변수를 설정합니다.

---

## 1️⃣ 네트워크 생성

WordPress와 MySQL이 통신할 수 있도록 **커스텀 브리지 네트워크**를 생성합니다.

```bash
docker network create ${docker_network_name}
```

---

## 2️⃣ MySQL 컨테이너 실행

```bash
docker run --name ${docker_mysql_name} -dit \
  --net=${docker_network_name} \
  -e MYSQL_ROOT_PASSWORD=${docker_mysql_root_password} \
  -e MYSQL_DATABASE=${docker_mysql_db_name} \
  -e MYSQL_USER=${docker_mysql_user} \
  -e MYSQL_PASSWORD=${docker_mysql_user_password} \
  mysql \
  --character-set-server=${mysql_charset} \
  --collation-server=${mysql_collation}
```

> 문자 인코딩 및 인증 방식은 환경 변수로 커스터마이징 가능합니다.

### 🔍 주요 옵션 설명

| 옵션                     | 설명                                                                                           |
| ------------------------ | ---------------------------------------------------------------------------------------------- |
| `--character-set-server` | 기본 문자셋을 설정합니다. 일반적으로 `utf8mb4` 사용 시 이모지 등 유니코드 지원이 가능해집니다. |
| `--collation-server`     | 정렬 방식(문자 비교 기준)을 설정합니다. `utf8mb4_unicode_ci`는 대소문자 구분 없이 비교합니다.  |

---

## 3️⃣ WordPress 컨테이너 실행

```bash
docker run --name ${docker_wordpress_name} -dit \
  --net=${docker_network_name} \
  -p ${wordpress_port}:80 \
  -e WORDPRESS_DB_HOST=${docker_mysql_name} \
  -e WORDPRESS_DB_NAME=${docker_mysql_db_name} \
  -e WORDPRESS_DB_USER=${docker_mysql_user} \
  -e WORDPRESS_DB_PASSWORD=${docker_mysql_user_password} \
  wordpress
```

> `${wordpress_port}`를 통해 브라우저 접근 포트를 자유롭게 설정할 수 있습니다.

---

## ✅ 확인 방법

```bash
# 컨테이너 상태 확인
docker ps

# 브라우저에서 접속 (포트는 커스텀값 사용)
http://localhost:${wordpress_port}
```

WordPress 초기 설치 화면이 보이면 성공입니다! 🎉

---

## 🧹 추가 팁

- 필요시 `--restart=always` 옵션으로 재부팅 시 자동 실행 가능
- `--volume` 옵션을 추가해 데이터 영속성 확보 가능

```bash
-v wp_data:/var/www/html
-v mysql_data:/var/lib/mysql
```

---

## 📌 변수 예시 (테스트용)

```bash
export docker_network_name=wp-net
export docker_mysql_name=mysql-wp
export docker_mysql_root_password=secret
export docker_mysql_db_name=wordpress
export docker_mysql_user=wpuser
export docker_mysql_user_password=secret
export docker_wordpress_name=wp
export wordpress_port=8080
export mysql_charset=utf8mb4
export mysql_collation=utf8mb4_unicode_ci
export mysql_auth_plugin=mysql_native_password
```

---

## 🧩 docker-compose 버전 예시

```yaml
services:
  db:
    image: mysql
    container_name: ${docker_mysql_name}
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: ${docker_mysql_root_password}
      MYSQL_DATABASE: ${docker_mysql_db_name}
      MYSQL_USER: ${docker_mysql_user}
      MYSQL_PASSWORD: ${docker_mysql_user_password}
    command: --character-set-server=${mysql_charset} --collation-server=${mysql_collation}
    volumes:
      - mysql_data:/var/lib/mysql
    networks:
      - ${docker_network_name}

  wordpress:
    image: wordpress
    container_name: ${docker_wordpress_name}
    restart: always
    ports:
      - '${wordpress_port}:80'
    environment:
      WORDPRESS_DB_HOST: ${docker_mysql_name}
      WORDPRESS_DB_NAME: ${docker_mysql_db_name}
      WORDPRESS_DB_USER: ${docker_mysql_user}
      WORDPRESS_DB_PASSWORD: ${docker_mysql_user_password}
    volumes:
      - wp_data:/var/www/html
    networks:
      - ${docker_network_name}

volumes:
  mysql_data:
  wp_data:

networks:
  wp-net:
    driver: bridge
```

> `.env` 파일에 위 변수들을 설정하고 `docker-compose up -d` 로 실행하세요 ✅

---

## 📝 .env 파일 템플릿 예시

```dotenv
# 네트워크 이름
docker_network_name=wp-net

# MySQL 설정
docker_mysql_name=mysql-wp
docker_mysql_root_password=secret
docker_mysql_db_name=wordpress
docker_mysql_user=wpuser
docker_mysql_user_password=secret
mysql_charset=utf8mb4
mysql_collation=utf8mb4_unicode_ci
mysql_auth_plugin=mysql_native_password

# WordPress 설정
docker_wordpress_name=wp
wordpress_port=8080
```
