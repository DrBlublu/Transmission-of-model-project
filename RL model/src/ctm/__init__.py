"""Shared library code for the cultural-transmission reproducibility repository.

Import paths and configuration from `ctm.paths`; keep analysis-specific helpers
in dedicated submodules so that scripts stay thin and testable.
"""

from ctm.paths import (
    DATA_PROCESSED,
    DATA_RAW,
    DOCS,
    FIGURES,
    LOGS,
    ROOT,
    ensure_output_dirs,
    load_config,
    resolve,
)

__all__ = [
    "ROOT",
    "DATA_RAW",
    "DATA_PROCESSED",
    "FIGURES",
    "LOGS",
    "DOCS",
    "load_config",
    "resolve",
    "ensure_output_dirs",
]

__version__ = "0.1.0"
