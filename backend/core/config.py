from typing import Any, Annotated

from pydantic import AnyUrl, Field
from pydantic.functional_validators import BeforeValidator
from pydantic_settings import BaseSettings, SettingsConfigDict

def parse_cors(v: Any) -> list[AnyUrl]:
    """
    Allow BACKEND_CORS_ORIGINS to be:
    - a list (["http://localhost:3000", "https://example.com"])
    - a comma-separated string ("http://localhost:3000,https://example.com")
    - empty / not set (return empty list)
    """
    if v is None or v == "":
        return []

    if isinstance(v, str):
        # split on commas, strip spaces
        items = [item.strip() for item in v.split(",") if item.strip()]
        return [AnyUrl(item) for item in items]

    if isinstance(v, list):
        return [AnyUrl(str(item)) for item in v]

    raise ValueError("Invalid BACKEND_CORS_ORIGINS format")

class Settings(BaseSettings):
    JWT_SECRET_KEY: str

    model_config = SettingsConfigDict(
        env_file=(".env", ".env.local"),
        env_file_encoding="utf-8",
        extra="ignore",
        env_ignore_empty=True,
    )

    BACKEND_CORS_ORIGINS: Annotated[
        list[AnyUrl] | str, BeforeValidator(parse_cors)
    ] = Field(default_factory=list)